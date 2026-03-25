const puppeteer = require('puppeteer');
const cookies = require('./x_cookies.js');

const REPLY_STYLES = [
  "Solid progress. Keep shipping",
  "This is exactly the kind of work that matters",
  "Love seeing this kind of transparency",
  "The grind is real. Respect",
  "Building in public takes guts. Nice work",
  "This is what founder life looks like",
  "Keep pushing. The market will respond",
  "Great update. Thanks for sharing",
  "The consistency is paying off",
  "Bold move sharing this early",
  "Your traction is interesting",
  "This is the way",
  "Forward motion. Love it",
  "The market needs more of this",
  "Respect for the hustle",
  "Stay focused, stay hungry",
  "Building something real",
  "The numbers tell a story",
  "Keep the momentum going",
  "This is growth in action"
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('Connecting to Chrome...');
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9223',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const page = pages[0] || await browser.newPage();
  
  console.log('Setting cookies...');
  await page.setCookie(...cookies);
  
  console.log('Navigating to #buildinpublic...');
  await page.goto('https://x.com/hashtag/buildinpublic', { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(3000);
  
  const repliedAccounts = new Set();
  let repliesSent = 0;
  let attemptCount = 0;
  const maxAttempts = 100;
  
  console.log('Scrolling and collecting tweets to reply to...');
  
  while (repliesSent < 20 && attemptCount < maxAttempts) {
    // Scroll to load more tweets
    await page.evaluate(() => window.scrollBy(0, 800));
    await sleep(1500);
    
    // Get all tweet articles
    const tweets = await page.$$('article[role="article"]');
    
    for (const tweet of tweets) {
      if (repliesSent >= 20) break;
      
      try {
        // Get username
        const usernameEl = await tweet.$('[data-testid="User-Name"] span');
        if (!usernameEl) continue;
        
        const usernameText = await page.evaluate(el => el.textContent, usernameEl);
        const username = usernameText.split('@')[1]?.split(' ')[0] || usernameText.replace('@', '');
        
        if (repliedAccounts.has(username)) continue;
        
        // Get tweet text
        const tweetTextEl = await tweet.$('[data-testid="tweetText"]');
        if (!tweetTextEl) continue;
        
        const tweetText = await page.evaluate(el => el.textContent, tweetTextEl);
        
        // Skip own tweets
        if (tweetText.includes('@julezrz') || username === 'julezrz') continue;
        
        // Find reply button
        const replyBtn = await tweet.$('[data-testid="reply"]');
        if (!replyBtn) continue;
        
        // Click reply
        await replyBtn.click();
        await sleep(1000);
        
        // Type reply
        const replyBox = await page.$('[data-testid="tweetTextarea_0"]');
        if (!replyBox) {
          await page.keyboard.press('Escape');
          continue;
        }
        
        const replyText = REPLY_STYLES[repliesSent % REPLY_STYLES.length];
        await replyBox.click();
        await sleep(300);
        await page.type('[data-testid="tweetTextarea_0"]', replyText, { delay: 50 });
        
        // Click send
        await sleep(500);
        const sendBtn = await page.$('[data-testid="tweetButton"]');
        if (sendBtn) {
          await sendBtn.click();
          console.log(`Replied to @${username}: "${replyText}"`);
          repliedAccounts.add(username);
          repliesSent++;
          await sleep(2000);
        }
        
        // Press escape to close
        await page.keyboard.press('Escape');
        await sleep(500);
        
      } catch (err) {
        console.log('Error processing tweet:', err.message);
        try {
          await page.keyboard.press('Escape');
        } catch(e) {}
        await sleep(500);
      }
    }
    
    attemptCount++;
  }
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Total replies sent: ${repliesSent}`);
  console.log(`Accounts replied to: ${Array.from(repliedAccounts).join(', ')}`);
  
  await browser.disconnect();
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});