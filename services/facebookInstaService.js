const snapsave = require("metadownloader");

async function facebookInsta(url) {
  try {
    console.log("📥 Service: Processing URL:", url);
    
    if (!url || typeof url !== 'string') {
      throw new Error("Invalid URL format");
    }

    const isFacebook = url.includes('facebook.com') || url.includes('fb.watch');
    const isInstagram = url.includes('instagram.com');
    
    if (!isFacebook && !isInstagram) {
      throw new Error("URL must be from Facebook or Instagram");
    }

    console.log("🔄 Service: Calling metadownloader...");
    const result = await snapsave(url);
    
    console.log("✅ Service: Success! Result:", JSON.stringify(result, null, 2));
    
    if (!result) {
      throw new Error("No data returned from metadownloader");
    }

    return result;
    
  } catch (error) {
    console.error("❌ Service Error:", error.message);
    console.error("Stack:", error.stack);
    
    if (error.message.includes("split")) {
      throw new Error("Invalid URL format. Please ensure you're using a direct link to a Facebook or Instagram post.");
    }
    
    if (error.message.includes("private") || error.message.includes("403")) {
      throw new Error("This content is private or restricted.");
    }
    
    if (error.message.includes("not found") || error.message.includes("404")) {
      throw new Error("Content not found. The post may have been deleted.");
    }
    
    throw new Error("Error fetching media: " + error.message);
  }
}

module.exports = facebookInsta;