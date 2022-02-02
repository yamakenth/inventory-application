#! /usr/bin/env node

// get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async');
var Product = require('./models/product');
var Category = require('./models/category');
var Manufacturer = require('./models/manufacturer');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = [];
var categories = [];
var manufacturers = [];

function productCreate(name, description, manufacturer, category, price, stock, cb) {
  productdetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    stock: stock
  }
  if (manufacturer != false) {
    productdetail.manufacturer = manufacturer;
  }

  var product = new Product(productdetail);

  product.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Product: ' + product);
    products.push(product);
    cb(null, product);
  });
}

function categoryCreate(name, description, cb) {
  categorydetail = {
    name: name,
    description: description
  }

  var category = new Category(categorydetail);

  category.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function manufacturerCreate(name, cb) {
  var manufacturer = new Manufacturer({ name: name });

  manufacturer.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Manufacturer: ' + manufacturer);
    manufacturers.push(manufacturer);
    cb(null, manufacturer);
  });
}

function createCategories(cb) {
  async.series([
    function(callback) {
      categoryCreate(
        'Laptop', 
        'A laptop, laptop computer, or notebook computer is a small, portable personal computer (PC) with a screen and alphanumeric keyboard.', 
        callback
      );
    },
    function(callback) {
      categoryCreate(
        'Tablet',
        'A tablet is a wireless, portable personal computer with a touchscreen interface. The tablet form factor is typically smaller than a notebook computer, but larger than a smartphone.',
        callback
      );
    },
    function(callback) {
      categoryCreate(
        'Smartphone',
        'A smartphone is a cell phone that allows you to do more than make phone calls and send text messages. Smartphones can browse the Internet and run software programs like a computer.',
        callback
      );
    },
    function(callback) {
      categoryCreate(
        'Accessory',
        'Equipment that supports other equipment. For example, smartphone accessories include phone cases, chargers and cables.',
        callback
      );
    }
  ], cb);
}

function createManufacturers(cb) {
  async.series([
    function(callback) {
      manufacturerCreate('Apple', callback);
    },
    function(callback) {
      manufacturerCreate('Dell', callback);
    },
    function(callback) {
      manufacturerCreate('Samsung', callback);
    },
    function(callback) {
      manufacturerCreate('Sony', callback);
    }
  ], cb);
}

function createProducts(cb) {
  async.parallel([
    function(callback) {
      productCreate(
        'iPhone 11 [128GB, Purple]',
        [
          '6.1-inch Liquid Retina HD LCD display',
          'Water and dust resistant (2 meters for up to 30 minutes, IP68)',
          'Dual-camera system with 12MP Ultra Wide and Wide cameras; Night mode, Portrait mode, and 4K video up to 60fps',
          '12MP TrueDepth front camera with Portrait mode, 4K video, and Slo-Mo',
          'Face ID for secure authentication and Apple Pay',
          'A13 Bionic chip with third-generation Neural Engine',
          'Fast-charge capable',
          'Wireless charging'
        ],
        manufacturers[0],
        categories[2],
        649.00,
        50,
        callback        
      );
    },
    function(callback) {
      productCreate(
        'MacBook Pro - 13.3 inches - 8 GB RAM',
        [
          'Apple-designed M1 chip for a giant leap in CPU, GPU, and machine learning performance',
          'Get more done with up to 20 hours of battery life, the longest ever in a Mac',
          '8-core CPU delivers up to 2.8x faster performance to fly through workflows quicker than ever',
          '8-core GPU with up to 5x faster graphics for graphics-intensive apps and games',
          '16-core Neural Engine for advanced machine learning',
          '8GB of unified memory so everything you do is fast and fluid',
          'Superfast SSD storage launches apps and opens files in an instant',
          'Active cooling system sustains incredible performance',
          '13.3-inch Retina display with 500 nits of brightness for vibrant colors and incredible image detail',
          'FaceTime HD camera with advanced image signal processor for clearer, sharper video calls'
        ],
        manufacturers[0],
        categories[0],
        1249.99,
        100,
        callback
      );
    },
    function(callback) {
      productCreate(
        'iPad Air - 10.9 inches - 256 GB RAM',
        [
          'Stunning 10.9-inch Liquid Retina display with True Tone and P3 wide color',
          'A14 Bionic chip with Neural Engine',
          'Touch ID for secure authentication and Apple Pay',
          '12MP back camera, 7MP FaceTime HD front camera',
          'Available in Silver, Space Gray, Rose Gold, Green, and Sky Blue',
          'Wide stereo audio',
          'Wi-Fi 6 (802.11ax)'
        ],
        manufacturers[0],
        categories[1],
        649.99,
        25,
        callback
      );
    },
    function(callback) {
      productCreate(
        'Apple AirPods (2nd Generation)',
        [
          'Quick access to Siri by saying “ Hey Siri ”',
          'More than 24 hours total listening time with the Charging Case',
          'Effortless setup, in-ear detection, and automatic switching for a magical experience',
          'Easily share audio between two sets of AirPods on your iPhone, iPad, iPod touch, or Apple TV'
        ],
        manufacturers[0],
        categories[3],
        118.98,
        200,
        callback
      );
    },
    function(callback) {
      productCreate(
        'XPS 13 9310 - 13.4 inches - 16 GB RAM',
        [
          'See Every Detail: The FHD+ (1920 x 1200) 500-nit touchscreen display offers pinpoint accuracy for all your computing needs. See the detail of every pixel in photos without needing to zoom in.',
          'Guaranteed Power: With 11th Gen InteI Core mobile processors, it’s now possible to enjoy incredibly immersive entertainment on a remarkably thin and light touchscreen laptop.',
          'Powerful Graphics: Intel Iris Plus graphics take a huge leap forward in gaming, streaming and creativity, pushing a smoother, more detailed and more vivid experience than ever before.',
          'Killer Wireless: The XPS 9310 thin laptop is built with Wi-Fi 6 techology, the AX1650 prioritizes streaming video, communication, and game traffic in your system for fast, smooth online experiences.',
          'Advanced Thermal Engineering: Dual fans separated to spread heat over a larger area ensure you have the best performing system in the thinnest form factor possible.',
          'Including 2 Year On-Site and 6 months Dell Migrate easily move your files and settings from your old PC to your new Dell'
        ],
        manufacturers[1],
        categories[0],
        1692.99,
        45,
        callback
      );
    },
    function(callback) {
      productCreate(
        'Wired Keyboard - Black KB216 (580-ADMT)',
        [
          'The Dell Wired Keyboard provides a convenient keyboard solution for everyday home or office computing uses.',
          'Device Type: Keyboard. Keys Style: Chiclet. Color: Black. Interface: USB.',
          'Dimensions (WxDxH): 17.4 x 5 x 1 inches. Weight: 17.74 oz.',
          'Designed For: Alienware 13 R2, 15 R2, 17 R3; Inspiron 3252, 3459; Latitude 31XX, 33XX, 34XX, 35XX, E5270, E5450, E5470, E5550, E5570, E6540, E7250, E7450',
          'Designed For: OptiPlex 30XX, 3240, 50XX, 70XX, 7440, 90XX; Precision Mobile Workstation 5510, 7710; Precision Tower 3420, 3620; Vostro 14 5480, 3250, 39XX; XPS 8700, 8900'
        ],
        manufacturers[1],
        categories[3],
        19.49,
        500,
        callback
      );
    },
    function(callback) {
      productCreate(
        'Tab A7 Lite - 8.7 inches - 3 GB RAM',
        [
          'THE ENTERTAINMENT GOES WHERE YOU GO: With its compact 8.7” screen, slim design and sturdy metal frame, Galaxy Tab A7 Lite is perfectly sized for entertainment on the go',
          'STURDY FRAME FOR LASTING PROTECTION: Galaxy Tab A7 Lite features an upgraded metal frame that helps protect against everyday hiccups',
          'TWO MONTHS OF AD-FREE VIDEO FUN: Keep everyone in the family entertained with two months of free YouTube Premium¹ for hours and hours of ad-free fun',
          'PERFORMANCE THAT WON\'T LET YOU DOWN: Comes with fast speed and plenty of storage for multiple users'
        ],
        manufacturers[2],
        categories[1],
        157.95,
        500,
        callback
      );
    },
    function(callback) {
      productCreate(
        'Galaxy Chromebook - 13.3 inches - 8 GB RAM',
        [
          'Crystal clarity. Vivid color: Experience superior picture quality and fully expansive color, contrast and depth with the 4K AMOLED touchscreen display to take your work and play to the next level.',
          'Split-second productivity: Boot up in as fast as 6 seconds and hit the ground running. Get ample storage with 256GB SSD and work, play and multitask seamlessly.',
          'Stroke of genius: Take notes, sketch ideas and edit documents easily and accurately with the built-in pen that fits seamlessly into Galaxy Chromebook’s ultra-slim design.',
          'Speedy. Simple. Secure: Chrome OS is the speedy, simple and secure operating system that powers Chromebooks. It is designed to feel intuitive and helpful every step of the way. It comes with the Google Assistant which helps you multitask and control smart devices. Plus, with apps from the Google Play Store, you can get work done, watch your favorite shows or play your favorite games.'
        ],
        manufacturers[2],
        categories[0],
        689.26,
        200,
        callback
      );
    },
    function(callback) {
      productCreate(
        'Galaxy S21 FE 5G Cell Phone, Factory Unlocked, 128 GB',
        [
          'SMOOTH SCROLLING: The 120Hz display delivers a super smooth scroll, with optimized refresh rate, and a fast touch response gives seamless visuals in both work and play',
          'REAL DISPLAY VISION: The high quality display with Dynamic AMOLED 2X delivers vibrant color and brightness, even in bright sunlight',
          'PRO-GRADE CAMERA: The powerful pro grade camera delivers high quality photos and videos, with a Rear Camera that boasts 12MP Ultra Wide, Wide-angle cameras and an 8MP Telephoto Camera; It also features a Front Camera that includes a 32MP Selfie Camera',
          '30X SPACE ZOOM: 30x SpaceZoom combines a 3x Hybrid Optic Zoom and 30x digital zoom for high resolution close ups, while the EngageZoom Lock reduces shakiness the further your zoom in',
          'SUPERIOR PERFORMANCE: The power-efficient processor chip offers reliability and performance that boosts every experience, from graphic-heavy gaming to multitasking.',
          'ALL DAY INTELLIGENT POWER: The 4500mAh intelligent battery outlasts the day, even on 5G, while Super Fast Charging can charge 50% in 30 minutes.'
        ],
        manufacturers[2],
        categories[2],
        599.99,
        50,
        callback
      );
    },
    function(callback) {
      productCreate(
        'WH-1000XM4 Wireless Industry Leading Noise Canceling Overhead Headphones',
        [
          'Industry-leading noise canceling with Dual Noise Sensor technology',
          'Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo',
          'Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback)',
          'Touch Sensor controls to pause play skip tracks, control volume, activate your voice assistant, and answer phone calls',
          'Speak-to-chat technology automatically reduces volume during conversations',
          'Superior call quality with precise voice pickup',
          'Wearing detection pauses playback when headphones are removed'
        ],
        manufacturers[3],
        categories[3],
        298,
        100,
        callback
      );
    }
  ], cb);
}

async.series(
  [createCategories, createManufacturers, createProducts],
  function(err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('UPDATE SUCCESSFUL');
    }
    mongoose.connection.close();
  }
);