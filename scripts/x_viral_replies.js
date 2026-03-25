const puppeteer = require('puppeteer');
const cookies = require('./x_cookies.js');

const BIG_ACCOUNTS = [
  'elonmusk', 'nvidia', 'NASA', 'levelsio', 'swyx', 'dabit3', 
  'a16z', 'pmarca', 'karpathy', 'AndrewYNg', 'brian_armstrong', 'rauchg', 'garrytan'
];

const REPLIES = {
  'elonmusk': [
    "This is exactly the kind of thinking that moves things forward",
    "Would love to see this implemented at scale",
    "Finally someone saying what we've all been thinking"
  ],
  'nvidia': [
    "The pace of innovation here is insane",
    "This changes everything for the industry",
    "Can't wait to see what this enables"
  ],
  'NASA': [
    "This is what inspires the next generation",
    "Incredible work pushing the boundaries",
    "The future of space exploration looks bright"
  ],
  'levelsio': [
    "Building in public the right way",
    "This is such a smart approach",
    "Love the execution here"
  ],
  'swyx': [
    "Great take on this topic",
    "This resonates with what I've been seeing",
    "Well said, completely agree"
  ],
  'dabit3': [
    "This is the move everyone needed to see",
    "Solid insight as always",
    "Exactly the perspective we need"
  ],
  'a16z': [
    "The thesis here makes total sense",
    "This is why you guys are ahead of the curve",
    "Great vision for what's coming"
  ],
  'pmarca': [
    "This is the kind of analysis I come here for",
    "Completely agree with this assessment",
    "Finally someone gets it"
  ],
  'karpathy': [
    "This is beautifully explained",
    "The intuition here is spot on",
    "I've been waiting for someone to say this"
  ],
  'AndrewYNg': [
    "This is exactly what the field needs",
    "Great explanation of a complex topic",
    "Really valuable perspective"
  ],
  'brian_armstrong': [
    "This is the leadership we need",
    "Bold move, love to see it",
    "This is how you build for the long term"
  ],
  'rauchg': [
    "This hits different",
    "The simplicity here is elegant",
    "Exactly the take I needed today"
  ],
  'garrytan': [
    "This is why you consistently spot trends first",
    "Great insight as always",
    "Solid point, hadn't thought of it that way"
  ]
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9223',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const page = pages[0] || await browser.newPage();
  
  // Clear and set cookies
  await page.setCookie(...cookies);
  
  // Navigate to X home
  console.log('Navigating to x.com/home...');
  await page.goto('https://x.com/home', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  
  const results = [];
  const accountsReplied = new Set();
  
  // Visit each big account and find recent tweets
  for (const account of BIG_ACCOUNTS) {
    if (accountsReplied.size >= 20) break;
    
    try {
      console.log(`\nChecking @${account}...`);
      await page.goto(`https://x.com/${account}`, { waitUntil: 'networkidle2', timeout: 20000 });
      await sleep(2000);
      
      // Get page content to find tweets
      const tweets = await page.evaluate(() => {
        const tweetElements = document.querySelectorAll('article[data-testid="tweet"]');
        const results = [];
        
        tweetElements.forEach((tweet, index) => {
          if (index >= 3) return; // Check first 3 tweets only
          
          // Get time element - look for recent tweets (minutes/hours, not days)
          const timeElement = tweet.querySelector('time');
          const timeText = timeElement ? timeElement.textContent : '';
          
          // Only consider recent tweets (within hours)
          if (timeText.includes('m') || timeText.includes('h') || timeText.includes('min') || timeText.includes('h')) {
            const tweetLink = tweet.querySelector('a[href*="/status/"]');
            const tweetId = tweetLink ? tweetLink.href.split('/').pop() : null;
            
            if (tweetId) {
              results.push({
                id: tweetId,
                time: timeText,
                text: tweet.textContent.substring(0, 200)
              });
            }
          }
        });
        
        return results;
      });
      
      if (tweets.length > 0) {
        // Reply to the most recent one
        const tweet = tweets[0];
        console.log(`Found recent tweet: ${tweet.time} - ${tweet.text.substring(0, 50)}...`);
        
        // Click on the tweet to open it
        await page.goto(`https://x.com/${account}/status/${tweet.id}`, { waitUntil: 'networkidle2', timeout: 15000 });
        await sleep(2000);
        
        // Find reply button and click it
        const replyButton = await page.$('button[data-testid="reply"]');
        if (replyButton) {
          await replyButton.click();
          await sleep(1500);
          
          // Type a reply
          const replyOptions = REPLIES[account] || ["Great point, totally agree"];
          const replyText = replyOptions[Math.floor(Math.random() * replyOptions.length)];
          
          const tweetInput = await page.$('div[contenteditable="true"]');
          if (tweetInput) {
            await tweetInput.type(replyText, { delay: 50 });
            await sleep(500);
            
            // Click reply button
            const sendButton = await page.$('button[data-testid="tweetButton"]');
            if (sendButton) {
              await sendButton.click();
              await sleep(1500);
              console.log(`✅ Replied to @${account}: "${replyText}"`);
              accountsReplied.add(account);
              results.push({ account, reply: replyText, time: tweet.time });
            }
          }
        }
      } else {
        console.log(`No recent tweets from @${account}`);
      }
      
    } catch (err) {
      console.log(`Error with @${account}: ${err.message}`);
    }
    
    await sleep(1000);
  }
  
  console.log('\n=== SUMMARY ===');
  console.log(`Total replies: ${results.length}`);
  console.log('Accounts replied to:', results.map(r => r.account).join(', '));
  
  await browser.disconnect();
}

main().catch(console.error);