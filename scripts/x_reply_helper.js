// X Tweet Reply Helper
// This script provides utilities for posting tweet replies via headless Chrome

const puppeteer = require('puppeteer');
const path = require('path');

// Load cookies from the workspace
let xCookies;
try {
  xCookies = require('./x_cookies.js');
} catch (e) {
  console.error('Could not load cookies. Ask Julan for fresh X cookies.');
  process.exit(1);
}

/**
 * Initialize browser and navigate to X
 */
async function initBrowser() {
  // Start chromium if not already running
  const { exec } = require('child_process');
  
  return new Promise((resolve, reject) => {
    exec('curl -s http://localhost:9223/json | head -5', async (err) => {
      if (err) {
        // Start chromium
        exec('nohup chromium --headless=new --no-sandbox --remote-debugging-port=9223 --disable-gpu --disable-dev-shm-usage --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" https://x.com > /tmp/chrome.log 2>&1 &', { detached: true });
        await new Promise(r => setTimeout(r, 3000));
      }
      
      try {
        const browser = await puppeteer.connect({
          browserURL: 'http://localhost:9223',
          defaultViewport: null
        });
        
        const pages = await browser.pages();
        const page = pages[0] || await browser.newPage();
        
        // Set cookies
        await page.setCookie(...xCookies);
        
        resolve({ browser, page });
      } catch (e) {
        reject(e);
      }
    });
  });
}

/**
 * Post a reply to a tweet
 * @param {string} page - Puppeteer page object
 * @param {string} tweetUrl - URL of the tweet to reply to
 * @param {string} replyText - The reply text
 */
async function postReply(page, tweetUrl, replyText) {
  try {
    await page.goto(tweetUrl, { waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise(r => setTimeout(r, 2000));
    
    const replyBtn = await page.$('[data-testid="reply"]');
    if (!replyBtn) return false;
    
    await replyBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    
    const input = await page.$('[data-testid="tweetTextarea_0"]');
    if (!input) return false;
    
    await input.type(replyText);
    await new Promise(r => setTimeout(r, 500));
    
    const postBtn = await page.$('[data-testid="tweetButton"]');
    if (!postBtn) return false;
    
    await postBtn.click();
    await new Promise(r => setTimeout(r, 2000));
    
    return true;
  } catch (e) {
    console.error('Error posting reply:', e.message);
    return false;
  }
}

/**
 * Get tweets from a URL
 * @param {string} page - Puppeteer page object  
 * @param {string} url - URL to get tweets from
 * @param {number} count - Number of tweets to get
 */
async function getTweets(page, url, count = 20) {
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  // Scroll to load more
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => window.scrollBy(0, 1500));
    await new Promise(r => setTimeout(r, 1500));
  }
  
  const tweets = await page.evaluate(() => {
    const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
    const tweetData = [];
    
    Array.from(tweetElements).forEach((tweet) => {
      const text = tweet.innerText || '';
      const timeLink = tweet.querySelector('a[href*="/status/"]');
      let link = '';
      if (timeLink) link = 'https://x.com' + timeLink.getAttribute('href');
      
      // Get handle
      const userLink = tweet.querySelector('a[href*="/"]');
      let handle = '';
      if (userLink) {
        const href = userLink.getAttribute('href');
        if (href && href.startsWith('/') && !href.includes('/status/')) {
          handle = href.replace('/', '');
        }
      }
      
      tweetData.push({ text, link, handle });
    });
    return tweetData;
  });
  
  return tweets.slice(0, count);
}

module.exports = {
  initBrowser,
  postReply,
  getTweets
};