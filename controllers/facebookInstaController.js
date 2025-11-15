const facebookInsta = require("../services/facebookInstaService");

async function handleFacebookInstaDownload(req, res) {
  const { url } = req.query;

  console.log("📨 Controller: Received request");
  console.log("URL:", url);

  if (!url) {
    console.warn("⚠️ Controller: Missing URL parameter");
    return res.status(400).json({ 
      success: false,
      error: "Missing 'url' query parameter.",
      data: {
        developer: "@Kelvinagbe",
        status: false,
        msg: "URL parameter is required"
      }
    });
  }

  let decodedUrl = url;
  try {
    decodedUrl = decodeURIComponent(url);
    console.log("🔗 Controller: Decoded URL:", decodedUrl);
  } catch (e) {
    console.warn("⚠️ Controller: URL decode failed, using original");
  }

  if (!decodedUrl.startsWith('http://') && !decodedUrl.startsWith('https://')) {
    console.warn("⚠️ Controller: Invalid URL format");
    return res.status(400).json({
      success: false,
      error: "Invalid URL format. URL must start with http:// or https://",
      data: {
        developer: "@Kelvinagbe",
        status: false,
        msg: "Invalid URL format"
      }
    });
  }

  try {
    console.log("🔄 Controller: Calling service...");
    const data = await facebookInsta(decodedUrl);
    
    console.log("✅ Controller: Success!");
    console.log("📦 Response data:", JSON.stringify(data, null, 2));
    
    res.json({ 
      success: true, 
      data: {
        developer: "@Kelvinagbe",
        status: true,
        ...data
      }
    });
    
  } catch (err) {
    console.error("❌ Controller Error:", err.message);
    
    res.status(500).json({ 
      success: false, 
      error: err.message,
      data: {
        developer: "@Kelvinagbe",
        status: false,
        msg: err.message
      }
    });
  }
}

module.exports = { handleFacebookInstaDownload };