// ══════════════════════════════════════
// HOUSE MAP — First-person camera system
// Door states: open (flag-open), closed (no flags), locked (flag-locked)
// ══════════════════════════════════════

const HOUSE_MAP = {

    "street": {
        name: "The Street",
        views: [
            { text: "You see the gate to the garden.", icon: "🚧",
              actions: [{ label: "Go to the gate", goto: "gate", arriveView: 0 }] },
            { text: "You see houses and a park far away.", icon: "🏘️", actions: [] },
            { text: "You see the road going far away.", icon: "🛣️", actions: [] },
            { text: "You see the sea and some boats.", icon: "⛵", actions: [] },
        ]
    },

    "gate": {
        name: "The Gate",
        views: [
            { text: "You see the garden and the house.", icon: "🏠",
              actions: [{ label: "Go to the front door", goto: "front-door", arriveView: 0 }] },
            { text: "You see the shed.", icon: "🏚️",
              actions: [{ label: "Go to the shed", goto: "shed", arriveView: 0 }] },
            { text: "You see the street and the gate.", icon: "🛣️🚧",
              actions: [
                  { label: "Go to the street", goto: "street", arriveView: 0, requires: "gate-open" },
                  { label: "Open the gate", setFlag: "gate-open", requiresNot: ["gate-open", "gate-locked"], result: "You open the gate!" },
                  { label: "Close the gate", clearFlag: "gate-open", requires: "gate-open", result: "You close the gate." },
                  { label: "Lock the gate", setFlag: "gate-locked", requiresNot: ["gate-open", "gate-locked"], needsItem: "has-house-keys", needsItemMsg: "You need the house keys!", result: "You lock the gate." },
                  { label: "Unlock the gate", clearFlag: "gate-locked", requires: "gate-locked", needsItem: "has-house-keys", needsItemMsg: "You need the house keys!", result: "You unlock the gate!" },
              ] },
            { text: "You see the chicken coop.", icon: "🐔",
              actions: [{ label: "Go to the chicken coop", goto: "chicken-coop", arriveView: 0 }] },
        ]
    },

    "garden": {
        name: "The Garden",
        views: [
            { text: "You see the front door of the house.", icon: "🏠",
              actions: [{ label: "Go to the front door", goto: "front-door", arriveView: 0 }] },
            { text: "You see the shed.", icon: "🏚️",
              actions: [{ label: "Go to the shed", goto: "shed", arriveView: 0 }] },
            { text: "You see the gate.", icon: "🚧",
              actions: [{ label: "Go to the gate", goto: "gate", arriveView: 2 }] },
            { text: "You see the chicken coop.", icon: "🐔",
              actions: [{ label: "Go to the chicken coop", goto: "chicken-coop", arriveView: 0 }] },
        ]
    },

    "front-door": {
        name: "The Front Door",
        views: [
            { text: "You see the front door. It is big and wooden.", icon: "🚪",
              actions: [
                  { label: "Go inside", goto: "living-room", arriveView: 2, requires: "front-door-open" },
                  { label: "Open the door", setFlag: "front-door-open", requiresNot: ["front-door-open", "front-door-locked"], result: "You open the door!" },
                  { label: "Close the door", clearFlag: "front-door-open", requires: "front-door-open", result: "You close the door." },
                  { label: "Lock the door", setFlag: "front-door-locked", requiresNot: ["front-door-open", "front-door-locked"], needsItem: "has-house-keys", needsItemMsg: "You need the house keys!", result: "You lock the door." },
                  { label: "Unlock the door", clearFlag: "front-door-locked", requires: "front-door-locked", needsItem: "has-house-keys", needsItemMsg: "You need the house keys!", result: "You unlock the door!" },
              ] },
            { text: "You see the shed.", icon: "🏚️",
              actions: [{ label: "Go to the shed", goto: "shed", arriveView: 0 }] },
            { text: "You see the gate in the distance.", icon: "🚧",
              actions: [{ label: "Go to the gate", goto: "gate", arriveView: 2 }] },
            { text: "You see the chicken coop.", icon: "🐔",
              actions: [{ label: "Go to the chicken coop", goto: "chicken-coop", arriveView: 0 }] },
        ]
    },

    "chicken-coop": {
        name: "The Chicken Coop",
        views: [
            { text: "You see the chickens and some eggs!", icon: "🐔🥚",
              actions: [
                  { label: "Take the eggs", setFlag: "has-eggs", requires: "has-basket", requiresNot: "has-eggs", result: "You put the eggs in the basket! 🥚🧺" },
              ] },
            { text: "You see the gate.", icon: "🚧",
              actions: [{ label: "Go to the gate", goto: "gate", arriveView: 3 }] },
            { text: "You see the front door of the house.", icon: "🏠",
              actions: [{ label: "Go to the front door", goto: "front-door", arriveView: 3 }] },
            { text: "You see the shed.", icon: "🏚️",
              actions: [{ label: "Go to the shed", goto: "shed", arriveView: 0 }] },
        ]
    },

    "shed": {
        name: "The Shed",
        views: [
            { text: "You see the shed door and a lemon tree.", icon: "🏚️🍋",
              actions: [
                  { label: "Take the lemons", setFlag: "has-lemons", requiresNot: "has-lemons", result: "You take the lemons! 🍋" },
                  { label: "Open the door", setFlag: "shed-open", requiresNot: ["shed-open", "shed-locked"], result: "The shed is open! You see a ladder, a bicycle, and chicken food." },
                  { label: "Close the door", clearFlag: "shed-open", requires: "shed-open", result: "You close the shed door." },
                  { label: "Lock the door", setFlag: "shed-locked", requiresNot: ["shed-open", "shed-locked"], needsItem: "has-shed-key", needsItemMsg: "You need the shed key!", result: "You lock the shed." },
                  { label: "Unlock the door", clearFlag: "shed-locked", requires: "shed-locked", needsItem: "has-shed-key", needsItemMsg: "You need the shed key!", result: "You unlock the shed!" },
                  { label: "Take the ladder", setFlag: "has-ladder", requires: "shed-open", requiresNot: "has-ladder", result: "You take the ladder! 🪜" },
                  { label: "Take the bicycle", setFlag: "has-bicycle", requires: "shed-open", requiresNot: "has-bicycle", result: "You take the bicycle! 🚲" },
                  { label: "Take the chicken food", setFlag: "has-chicken-food", requires: "shed-open", requiresNot: "has-chicken-food", result: "You take the chicken food! 🌾" },
              ] },
            { text: "You see the kitchen window.", icon: "🪟",
              actions: [
                  { label: "Open the window", setFlag: "kitchen-window-open", requiresNot: "kitchen-window-open", result: "You open the kitchen window!" },
                  { label: "Close the window", clearFlag: "kitchen-window-open", requires: "kitchen-window-open", result: "You close the kitchen window." },
                  { label: "Go inside", goto: "kitchen", arriveView: 1, requires: "kitchen-window-open" },
              ] },
            { text: "You see the backyard and the tree.", icon: "🌲",
              actions: [{ label: "Go to the backyard", goto: "backyard", arriveView: 1 }] },
            { text: "You see the garden.", icon: "🌳",
              actions: [{ label: "Go to the garden", goto: "garden", arriveView: 1 }] },
        ]
    },

    "backyard": {
        name: "The Backyard",
        views: [
            { text: "You see the kitchen back door.", icon: "🚪",
              actions: [
                  { label: "Go inside", goto: "kitchen", arriveView: 1, requires: "kitchen-door-open" },
                  { label: "Open the door", setFlag: "kitchen-door-open", requiresNot: ["kitchen-door-open", "kitchen-door-locked"], result: "You open the kitchen door!" },
                  { label: "Close the door", clearFlag: "kitchen-door-open", requires: "kitchen-door-open", result: "You close the kitchen door." },
                  { label: "Lock the door", setFlag: "kitchen-door-locked", requiresNot: ["kitchen-door-open", "kitchen-door-locked"], needsItem: "has-house-keys", needsItemMsg: "You need the house keys!", result: "You lock the kitchen door." },
                  { label: "Unlock the door", clearFlag: "kitchen-door-locked", requires: "kitchen-door-locked", needsItem: "has-house-keys", needsItemMsg: "You need the house keys!", result: "You unlock the kitchen door!" },
              ] },
            { text: "You see the shed.", icon: "🏚️",
              actions: [{ label: "Go to the shed", goto: "shed", arriveView: 0 }] },
            { text: "You see the neighbor's fence.", icon: "🪵", actions: [] },
            { text: "You see a big tall tree. You can climb it!", icon: "🌲",
              actions: [{ label: "Climb the tree", goto: "top-tree", arriveView: 0, pos: "top" }] },
        ]
    },

    "top-tree": {
        name: "Top of the Tree",
        alwaysActions: [{ label: "Climb down", goto: "backyard", arriveView: 0, pos: "bottom" }],
        views: [
            { text: "You see a forest.", icon: "🌲🌳", actions: [] },
            { text: "You see the garden, the gate, and the street.", icon: "🛣️", actions: [] },
            { text: "You see the neighbor's house.", icon: "🏘️", actions: [] },
            { text: "You see the roof of the house.", icon: "🏠", actions: [] },
        ]
    },

    "living-room": {
        name: "The Living Room",
        views: [
            { text: "You see the front door.", icon: "🚪",
              actions: [
                  { label: "Go outside", goto: "garden", arriveView: 2, requires: "front-door-open" },
              ] },
            { text: "You see the kitchen door.", icon: "🚪",
              actions: [{ label: "Go to the kitchen", goto: "kitchen", arriveView: 1 }] },
            { text: "You see a sofa and a TV.", icon: "🛋️📺",
              actions: [
                  { label: "Look in the sofa", setFlag: "sofa-looked", requiresNot: "sofa-looked", result: "You find the house keys! 🔑" },
                  { label: "Take the house keys", setFlag: "has-house-keys", requires: "sofa-looked", requiresNot: "has-house-keys", result: "You take the house keys!" },
              ] },
            { text: "You see two doors. The bedroom and the bathroom.", icon: "🚪🚪",
              actions: [
                  { label: "Go to the bedroom", goto: "bedroom", arriveView: 1 },
                  { label: "Go to the bathroom", goto: "bathroom", arriveView: 1 },
              ] },
        ]
    },

    "kitchen": {
        name: "The Kitchen",
        views: [
            { text: "You see the door to the living room.", icon: "🚪",
              actions: [{ label: "Go to the living room", goto: "living-room", arriveView: 2 }] },
            { text: "You see a big white fridge, the sink, and a drawer.", icon: "🧊🚰",
              actions: [
                  { label: "Open the fridge", setFlag: "fridge-open", requiresNot: "fridge-open", result: "You open the fridge. You see milk, juice, and cheese." },
                  { label: "Close the fridge", clearFlag: "fridge-open", requires: "fridge-open", result: "You close the fridge." },
                  { label: "Open the drawer", setFlag: "kitchen-drawer-opened", requiresNot: "kitchen-drawer-opened", result: "Spoons, forks, and knives." },
              ] },
            { text: "You see the back door and a wood stove.", icon: "🚪🍳",
              actions: [
                  { label: "Go to the backyard", goto: "backyard", arriveView: 3, requires: "kitchen-door-open" },
                  { label: "Open the door", setFlag: "kitchen-door-open", requiresNot: ["kitchen-door-open", "kitchen-door-locked"], result: "You open the kitchen door!" },
                  { label: "Close the door", clearFlag: "kitchen-door-open", requires: "kitchen-door-open", result: "You close the kitchen door." },
                  { label: "Lock the door", setFlag: "kitchen-door-locked", requiresNot: ["kitchen-door-open", "kitchen-door-locked"], needsItem: "has-house-keys", needsItemMsg: "You need the house keys!", result: "You lock the kitchen door." },
                  { label: "Unlock the door", clearFlag: "kitchen-door-locked", requires: "kitchen-door-locked", needsItem: "has-house-keys", needsItemMsg: "You need the house keys!", result: "You unlock the kitchen door!" },
              ] },
            { text: "You see a table and a basket.", icon: "🪑🧺",
              actions: [
                  { label: "Take the basket", setFlag: "has-basket", requiresNot: "has-basket", result: "You take the basket! 🧺" },
                  { label: "Look under the table", setFlag: "table-looked", requiresNot: "table-looked", result: "Nothing here. Dust and crumbs." },
              ] },
        ]
    },

    "bedroom": {
        name: "The Bedroom",
        views: [
            { text: "You see the door to the living room.", icon: "🚪",
              actions: [{ label: "Go to the living room", goto: "living-room", arriveView: 2 }] },
            { text: "You see the bed with a pillow.", icon: "🛏️🛌",
              actions: [
                  { label: "Look under the bed", setFlag: "bed-looked", requiresNot: "bed-looked", result: "You find a phone! 📱" },
                  { label: "Take the phone", setFlag: "has-phone", requires: "bed-looked", requiresNot: "has-phone", result: "You take the phone!" },
                  { label: "Look under the pillow", setFlag: "pillow-looked", requiresNot: "pillow-looked", result: "Nothing here." },
              ] },
            { text: "You see the window and a small desk with a drawer.", icon: "🪟🗄️",
              actions: [
                  { label: "Open the window", setFlag: "bedroom-window-open", requiresNot: "bedroom-window-open", result: "Fresh air comes in!" },
                  { label: "Close the window", clearFlag: "bedroom-window-open", requires: "bedroom-window-open", result: "You close the window." },
                  { label: "Open the drawer", setFlag: "desk-drawer-opened", requiresNot: "desk-drawer-opened", result: "Pencils, a notebook, and the shed key! 🔑" },
                  { label: "Take the shed key", setFlag: "has-shed-key", requires: "desk-drawer-opened", requiresNot: "has-shed-key", result: "You take the shed key!" },
              ] },
            { text: "You see the closet. It is closed.", icon: "🚪👕",
              actions: [
                  { label: "Open the closet", setFlag: "closet-open", requiresNot: "closet-open", result: "The closet is open! You see shirts, pants, and a jacket." },
                  { label: "Close the closet", clearFlag: "closet-open", requires: "closet-open", result: "You close the closet." },
                  { label: "Take the jacket", setFlag: "has-jacket", requires: "closet-open", requiresNot: "has-jacket", result: "You take the jacket!" },
              ] },
        ]
    },

    "bathroom": {
        name: "The Bathroom",
        views: [
            { text: "You see the door to the living room and a towel.", icon: "🚪🧴",
              actions: [
                  { label: "Go to the living room", goto: "living-room", arriveView: 2 },
                  { label: "Pick up the towel", setFlag: "has-towel", requiresNot: "has-towel", result: "You pick up the towel!" },
              ] },
            { text: "You see the shower and the bathtub.", icon: "🚿🛁", actions: [] },
            { text: "You see the window and the washbasin.", icon: "🪟🚰",
              actions: [
                  { label: "Open the window", setFlag: "bathroom-window-open", requiresNot: "bathroom-window-open", result: "You hear birds!" },
                  { label: "Close the window", clearFlag: "bathroom-window-open", requires: "bathroom-window-open", result: "You close the window." },
              ] },
            { text: "You see the toilet.", icon: "🚽", actions: [] },
        ]
    },
};
