/**
 * Prompts for the AI product photos: one 2×2 grid per product, generated with
 * GPT Image 2 (Low, 2K, 1:1) on Higgsfield. Tile order matches `product.images`:
 * one tile per colour, then detail shots.
 *
 *   npx tsx scripts/image-prompts.ts > scripts/raw-images/prompts.json
 */
import { products } from "@/data/products";
import { IMAGES_PER_PRODUCT } from "@/data/catalog/define";

interface Look {
  /** What the product looks like. Designs are deliberately generic so nothing resembles a real model. */
  subject: string;
  /** Camera angle for the colour tiles. */
  view: string;
  /** Shots that fill the tiles after the colour tiles, in order. */
  details: string[];
}

const PHONE_DETAILS = [
  "the first colour lying flat on its back, close-up of the camera island",
  "the first colour standing upright seen from the front, screen showing a soft abstract gradient wallpaper",
  "the first colour seen from the side, showing its slim profile and buttons",
];
const LAPTOP_DETAILS = [
  "the first colour closed, seen from above at an angle",
  "close-up of the keyboard and touchpad of the first colour",
  "the first colour open seen from the side, showing its thin profile and ports",
];
const CAMERA_DETAILS = [
  "the camera seen from the back, showing the screen and controls",
  "the camera seen from above, showing the dials",
  "close-up of the lens",
];
const MONITOR_DETAILS = [
  "the monitor seen from the back, showing the stand and ports",
  "the monitor seen from the side, showing how thin it is",
  "close-up of the bottom edge and stand base",
];
const APPAREL_DETAILS = [
  "close-up of the fabric texture and stitching of the first colour",
  "the first colour neatly folded",
  "the first colour seen from the back",
];
const SHOE_DETAILS = [
  "the first colour seen from above, both shoes side by side",
  "close-up of the sole of the first colour",
  "the first colour seen from the back heel",
];

const looks: Record<string, Look> = {
  "vela-x1-phone": { subject: "a modern smartphone with a flat frosted-glass back and a large circular camera island centred near the top holding three lenses", view: "standing upright, three-quarter back view", details: PHONE_DETAILS },
  "vela-x1-pro-phone": { subject: "a premium smartphone with a brushed titanium frame, a matte glass back and a wide horizontal camera bar across the top holding three lenses and a periscope window", view: "standing upright, three-quarter back view", details: PHONE_DETAILS },
  "vela-lite-phone": { subject: "an affordable smartphone with a smooth matte plastic back and two separate round lenses stacked vertically in the top-left corner", view: "standing upright, three-quarter back view", details: PHONE_DETAILS },
  "vela-fold-phone": { subject: "a book-style folding smartphone with a slim hinge and a vertical camera strip on the back", view: "half-open like a book, standing on a light surface", details: ["the phone fully unfolded, showing the large inner screen with a soft abstract wallpaper", "the phone folded closed, seen from the side to show the hinge", "close-up of the hinge"] },
  "vela-mini-phone": { subject: "a compact small smartphone with soft rounded edges and a small oval camera module holding two lenses", view: "standing upright, three-quarter back view", details: PHONE_DETAILS },
  "vela-a5-phone": { subject: "a simple budget smartphone with a textured matte back and a single round camera lens with a flash", view: "standing upright, three-quarter back view", details: PHONE_DETAILS },
  "vela-s3-phone": { subject: "a slim mid-range smartphone with a glossy glass back and a raised vertical capsule-shaped camera module with three lenses", view: "standing upright, three-quarter back view", details: PHONE_DETAILS },
  "vela-rugged-phone": { subject: "a rugged outdoor smartphone with thick rubberised bumpers, exposed screws and a chunky square camera block", view: "standing upright, three-quarter back view", details: PHONE_DETAILS },
  "vela-tab-11": { subject: "an 11-inch tablet with thin even bezels and a single small round camera on the back", view: "standing upright on a thin stand, front view, screen showing a soft abstract wallpaper", details: ["the first colour seen from the back", "the first colour lying flat with a stylus pen beside it", "close-up of the edge showing speakers and USB-C port"] },
  "vela-tab-mini": { subject: "a small 8-inch tablet with rounded corners and a soft-touch back", view: "standing upright, front view, screen showing a colourful children's drawing app", details: ["the first colour seen from the back", "the first colour held in a protective kids' foam case with a handle", "the first colour lying flat, seen from above"] },
  "vela-tab-pro-13": { subject: "a large 13-inch professional tablet with very thin bezels, attached to a slim detachable keyboard cover", view: "open like a laptop on the keyboard cover, screen showing a soft abstract wallpaper", details: ["the tablet alone seen from the back", "the tablet lying flat with a stylus", "close-up of the keyboard cover", "the tablet seen from the side, very thin"] },
  "vela-65w-charger": { subject: "a compact cube-shaped wall charger with two USB-C ports and one USB-A port and a foldable plug", view: "three-quarter front view showing the ports", details: ["the first colour with its plug prongs folded in, seen from the back", "the first colour connected to a coiled braided USB-C cable", "close-up of the ports"] },
  "vela-magnetic-powerbank": { subject: "a slim rounded-rectangle magnetic power bank with a fold-out kickstand and a USB-C port", view: "three-quarter front view", details: ["the first colour with its kickstand opened", "the first colour seen from the side, very slim", "close-up of the USB-C port and status lights"] },

  "atlas-14-laptop": { subject: "a slim 14-inch aluminium laptop with a thin bezel display", view: "open at 110 degrees, three-quarter front view, screen showing a soft abstract gradient wallpaper", details: LAPTOP_DETAILS },
  "atlas-13-air-laptop": { subject: "an ultra-thin 13-inch fanless laptop with a wedge-free flat design", view: "open at 110 degrees, three-quarter front view, screen showing a soft abstract gradient wallpaper", details: LAPTOP_DETAILS },
  "atlas-16-pro-laptop": { subject: "a 16-inch professional laptop in space-grey aluminium with large speaker grilles beside the keyboard", view: "open at 110 degrees, three-quarter front view, screen showing a colourful photo editing layout without readable text", details: LAPTOP_DETAILS },
  "atlas-flip-14-laptop": { subject: "a 14-inch convertible 2-in-1 laptop with a 360-degree hinge and a stylus", view: "open as a normal laptop, three-quarter front view, screen showing a soft abstract wallpaper", details: ["the first colour folded into tent mode", "the first colour folded flat as a tablet with the stylus on top", "close-up of the 360-degree hinge"] },
  "vortex-gaming-laptop": { subject: "an angular black gaming laptop with red RGB backlit keyboard and large rear cooling vents", view: "open, three-quarter front view, screen showing an abstract neon landscape", details: ["the laptop seen from the back, showing the rear vents and ports", "close-up of the RGB keyboard glowing red", "the laptop closed, seen from above at an angle, showing the angular lid design"] },
  "atlas-vortex-17-laptop": { subject: "a large 17-inch black gaming laptop with a mechanical RGB keyboard glowing multicolour and a thick cooling chassis", view: "open, three-quarter front view, screen showing an abstract sci-fi landscape", details: ["the laptop seen from the back, showing large vents", "close-up of the mechanical keys glowing", "the laptop closed, seen from above at an angle"] },
  "atlas-vortex-14-laptop": { subject: "a compact 14-inch gaming laptop with a subtle dot-matrix lid pattern and white backlit keys", view: "open, three-quarter front view, screen showing an abstract colourful game landscape", details: LAPTOP_DETAILS },
  "breeze-cloudbook": { subject: "a small 11-inch student laptop with a rubberised rounded body", view: "open, three-quarter front view, screen showing a simple colourful wallpaper", details: LAPTOP_DETAILS },
  "atlas-15-everyday-laptop": { subject: "a 15.6-inch everyday laptop with a full keyboard and number pad", view: "open, three-quarter front view, screen showing a soft abstract wallpaper", details: LAPTOP_DETAILS },
  "atlas-student-laptop": { subject: "a tough 14-inch student laptop with reinforced rubber corners and a webcam privacy shutter", view: "open, three-quarter front view, screen showing a simple wallpaper", details: LAPTOP_DETAILS },

  "lumen-4k-vlog-camera": { subject: "a compact vlogging camera with a flip-up selfie screen and a small top microphone", view: "three-quarter front view with the screen flipped up", details: ["the first colour seen from the back with the screen folded", "the first colour on a small tripod grip", "close-up of the lens"] },
  "lumen-pocket-camera": { subject: "a retro-styled compact camera with a fixed prime lens, top dials and a leatherette grip", view: "three-quarter front view", details: CAMERA_DETAILS },
  "orbit-mirrorless-camera": { subject: "a mirrorless camera body with a deep hand grip and a kit zoom lens attached", view: "three-quarter front view", details: CAMERA_DETAILS },
  "lumen-orbit-pro-camera": { subject: "a professional full-frame mirrorless camera with a large grip, a top status screen and a fast zoom lens", view: "three-quarter front view", details: CAMERA_DETAILS },
  "lumen-50mm-lens": { subject: "a compact black 50 mm camera prime lens with a ribbed focus ring", view: "standing upright, three-quarter view", details: ["the lens lying on its side showing the mount", "the lens attached to a mirrorless camera body", "close-up of the front glass with reflections"] },
  "trail-action-camera": { subject: "a small rugged cube-shaped action camera with front and back screens", view: "three-quarter front view", details: ["the camera inside a clear waterproof housing", "the camera mounted on a small handlebar clamp", "the camera seen from the back showing the rear screen"] },
  "lumen-360-camera": { subject: "a slim stick-shaped 360 camera with a fisheye lens on each side", view: "standing upright, three-quarter view", details: ["the camera on a thin extendable selfie stick", "close-up of the fisheye lens", "the camera lying flat beside its pouch"] },
  "pixie-kids-camera": { subject: "a chunky toy-like kids' camera with a soft silicone shell shaped with little bear ears", view: "three-quarter front view", details: ["the first colour seen from the back showing a small screen with a cartoon frame", "the first colour with its wrist lanyard", "both colours side by side"] },

  "swift-24-office-monitor": { subject: "a 24-inch office monitor with slim bezels on three sides and a simple round stand", view: "front three-quarter view, screen showing a soft abstract wallpaper", details: MONITOR_DETAILS },
  "clarity-27-usbc-monitor": { subject: "a 27-inch monitor with a height-adjustable column stand and a single USB-C cable", view: "front three-quarter view, screen showing a soft abstract wallpaper", details: MONITOR_DETAILS },
  "arc-34-curved-monitor": { subject: "a 34-inch ultrawide curved monitor with a V-shaped stand", view: "front three-quarter view, screen showing a wide abstract landscape", details: MONITOR_DETAILS },
  "clarity-27-240hz-monitor": { subject: "a 27-inch gaming monitor with a sharp angular stand and a subtle red accent", view: "front three-quarter view, screen showing an abstract neon racing scene", details: MONITOR_DETAILS },
  "clarity-24-portable-monitor": { subject: "a thin portable 15.6-inch monitor with a magnetic folding cover stand", view: "standing on its folded cover, front three-quarter view, screen showing a soft abstract wallpaper", details: ["the monitor next to a laptop as a second screen", "the monitor folded closed in its cover", "close-up of the USB-C ports on the side"] },
  "clarity-27-4k-monitor": { subject: "a 27-inch 4K creator monitor with a minimal aluminium stand", view: "front three-quarter view, screen showing a vivid colourful nature photo", details: MONITOR_DETAILS },
  "clarity-32-5k-monitor": { subject: "a large 32-inch studio display with a thin aluminium frame and a small camera at the top", view: "front three-quarter view, screen showing a vivid abstract colour field", details: MONITOR_DETAILS },

  "everyday-cotton-hoodie": { subject: "a plain pullover cotton hoodie with a kangaroo pocket, displayed on an invisible ghost mannequin", view: "front view", details: APPAREL_DETAILS },
  "kora-essential-tee": { subject: "a plain crew-neck cotton t-shirt, displayed on an invisible ghost mannequin", view: "front view", details: [] },
  "knit-turtleneck-sweater": { subject: "a cable-knit turtleneck sweater, displayed on an invisible ghost mannequin", view: "front view", details: APPAREL_DETAILS },
  "corduroy-overshirt": { subject: "a corduroy overshirt with two flap chest pockets, displayed on an invisible ghost mannequin", view: "front view", details: APPAREL_DETAILS },
  "kora-linen-shirt": { subject: "a relaxed linen button-up shirt with a soft collar, displayed on an invisible ghost mannequin", view: "front view", details: APPAREL_DETAILS },
  "puffer-winter-jacket": { subject: "a quilted puffer jacket with a high collar, displayed on an invisible ghost mannequin", view: "front view", details: APPAREL_DETAILS },
  "kora-trench-coat": { subject: "a double-breasted belted trench coat, displayed on an invisible ghost mannequin", view: "front view", details: APPAREL_DETAILS },
  "kora-rain-shell": { subject: "a lightweight hooded rain jacket with taped seams, displayed on an invisible ghost mannequin", view: "front view", details: APPAREL_DETAILS },
  "classic-cargo-pants": { subject: "relaxed cotton cargo trousers with side pockets, displayed on an invisible ghost mannequin", view: "front view", details: APPAREL_DETAILS },
  "kora-slim-chinos": { subject: "slim tapered chino trousers, displayed on an invisible ghost mannequin", view: "front view", details: APPAREL_DETAILS },
  "kora-relaxed-jeans": { subject: "relaxed straight-leg jeans, displayed on an invisible ghost mannequin", view: "front view", details: APPAREL_DETAILS },
  "kora-runner-sneakers": { subject: "a pair of lightweight knit running sneakers with a chunky foam sole", view: "side view of a pair, one slightly in front", details: SHOE_DETAILS },
  "kora-leather-loafers": { subject: "a pair of classic leather penny loafers with stitched soles", view: "side view of a pair, one slightly in front", details: SHOE_DETAILS },
  "kora-canvas-slip-ons": { subject: "a pair of simple canvas slip-on shoes with white rubber soles", view: "side view of a pair, one slightly in front", details: SHOE_DETAILS },

  "builder-robot-kit": { subject: "a friendly assembled build-it-yourself robot toy made of plastic beams, wheels and a small control hub", view: "three-quarter front view", details: ["the first colour shown with its loose building pieces laid out neatly", "close-up of the robot's control hub and wheels"] },
  "playlab-city-blocks": { subject: "a colourful toy building made of interlocking plastic bricks", view: "three-quarter view", details: ["a plastic storage tub full of loose colourful bricks", "a small brick-built car next to the building"] },
  "racer-rc-car": { subject: "an off-road remote-control monster truck toy with big knobby tyres", view: "three-quarter front view", details: ["the first colour with its pistol-grip remote controller", "close-up of the suspension and tyres"] },
  "playlab-mini-drone": { subject: "a small palm-sized toy quadcopter drone with protective propeller guards", view: "three-quarter view from slightly above", details: ["the first colour with its small handheld remote", "close-up of the small front camera"] },
  "cozy-plush-bear": { subject: "a soft cuddly teddy bear plush toy with embroidered eyes", view: "sitting, front view", details: ["the first colour seen from the side", "close-up of the soft fur texture"] },
  "playlab-bunny-plush": { subject: "a soft sleepy bunny plush toy with long floppy ears and a softly glowing belly", view: "sitting, front view", details: ["the first colour with its belly gently glowing in dim light", "close-up of the floppy ears"] },
  "playlab-family-board-game": { subject: "a family board game with a desert-themed board, wooden pawns and card decks, shown without readable text", view: "the board unfolded with pieces set up, seen from above at an angle", details: ["the closed game box with an abstract desert illustration and no text", "close-up of wooden pawns and cards", "the game components neatly sorted"] },
  "playlab-puzzle-1000": { subject: "a 1000-piece jigsaw puzzle of a sunset over sand dunes", view: "the puzzle partly assembled on a table, seen from above at an angle", details: ["the finished puzzle seen from above", "close-up of loose puzzle pieces", "the puzzle box with an abstract dune illustration and no text"] },

  "aurora-wireless-headphones": { subject: "over-ear wireless headphones with soft cushioned ear cups and a padded headband", view: "three-quarter view", details: ["the first colour folded flat inside an open travel case"] },
  "aurora-buds-pro": { subject: "a pair of wireless earbuds and their small pebble-shaped charging case, lid open", view: "three-quarter view", details: ["close-up of a single earbud"] },
  "aurora-mini-speaker": { subject: "a small round portable waterproof speaker with a fabric grille and a carry strap", view: "three-quarter view", details: ["the first colour floating in clear water"] },
  "aurora-studio-soundbar": { subject: "a slim black TV soundbar with a fabric front and a separate cube wireless subwoofer", view: "three-quarter view of both pieces", details: ["close-up of the soundbar's fabric grille and top buttons", "the soundbar seen from the back showing its ports", "the subwoofer alone, three-quarter view"] },
  "meridian-chronograph-watch": { subject: "a stainless-steel chronograph wristwatch with three sub-dials and a link bracelet, dial without any text or logo", view: "three-quarter view", details: ["close-up of the dial of the first colour"] },
  "halden-minimal-watch": { subject: "a minimalist slim wristwatch with a plain dial without numbers or text, on a leather strap", view: "three-quarter view", details: ["close-up of the plain dial"] },
  "halden-smartwatch": { subject: "a round smartwatch with a sport silicone strap, screen showing simple activity rings without text", view: "three-quarter view", details: ["close-up of the round screen"] },
  "halden-dive-watch": { subject: "an automatic dive watch with a rotating ceramic bezel and luminous hands, dial without any text or logo, on a rubber strap", view: "three-quarter view", details: ["close-up of the bezel", "the watch seen from the side showing the crown"] },
  "voyager-laptop-backpack": { subject: "a modern minimalist laptop backpack with clean lines and a front zip pocket", view: "front three-quarter view", details: ["the first colour open showing a padded laptop sleeve"] },
  "kora-weekender-bag": { subject: "a waxed-canvas weekender duffel bag with leather handles and trim", view: "front three-quarter view", details: ["the first colour open showing the inside", "close-up of the leather handles and zip"] },
  "kora-crossbody-bag": { subject: "a small structured leather crossbody bag with an adjustable strap", view: "front three-quarter view", details: ["close-up of the leather grain and clasp"] },
  "sola-square-sunglasses": { subject: "oversized square acetate sunglasses with chain-link detail on the temples", view: "front view, slightly angled", details: ["the first colour folded beside a hard case", "close-up of the chain-link temple"] },
  "halden-aviator-sunglasses": { subject: "classic metal-frame aviator sunglasses with tinted lenses", view: "front view, slightly angled", details: ["the first colour folded beside a soft pouch", "close-up of the nose pads and bridge"] },
  "halden-blue-light-glasses": { subject: "light round eyeglasses with clear lenses", view: "front view, slightly angled", details: ["the first colour folded on top of a closed laptop", "close-up of the thin temple hinge"] },
};

const STYLE =
  "A 2x2 grid of four separate square e-commerce studio product photographs, divided by thin pure-white gutters. " +
  "Identical style in all four: seamless very light warm-grey studio backdrop, soft diffused lighting, gentle natural shadow beneath the product, " +
  "product centred and filling about 65% of the frame, photorealistic, crisp detail, premium catalogue look.";
const RULES = "Absolutely no text, no letters, no numbers, no logos, no brand marks, no watermark, no people, no hands.";
const POSITIONS = ["Top-left", "Top-right", "Bottom-left", "Bottom-right"];

export function buildPrompts() {
  return products.map((product) => {
    const look = looks[product.slug];
    if (!look) throw new Error(`No image look for ${product.slug}`);
    const firstColour = product.colors[0].name.en.toLowerCase();
    const shots = [
      ...product.colors.map((color, i) =>
        i === 0
          ? `the product in ${color.name.en.toLowerCase()}, ${look.view}`
          : `the same product in ${color.name.en.toLowerCase()}, ${look.view}`,
      ),
      ...look.details.map((detail) => detail.replaceAll("the first colour", `the ${firstColour} one`)),
    ];
    // Single-colour products with few details repeat the hero shot from a new angle.
    while (shots.length < IMAGES_PER_PRODUCT) shots.push(`the ${firstColour} product seen from a different angle`);
    const tiles = shots.slice(0, IMAGES_PER_PRODUCT).map((shot, i) => `${POSITIONS[i]}: ${shot}.`);
    return {
      slug: product.slug,
      prompt: `${STYLE} The product is ${look.subject}. ${tiles.join(" ")} ${RULES}`,
    };
  });
}

console.log(JSON.stringify(buildPrompts(), null, 2));
