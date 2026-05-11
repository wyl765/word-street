# Deep Audit — Batch A (words-level1.js + words-level2.js)

## Audit Table

| # | word | verdict | issue (if any) |
|---|------|---------|----------------|
| 1 | puppy | PASS | |
| 2 | kitten | PASS | |
| 3 | bunny | PASS | |
| 4 | duckling | PASS | |
| 5 | chick | PASS | |
| 6 | lamb | PASS | |
| 7 | cub | PASS | |
| 8 | fawn | PASS | |
| 9 | foal | PASS | |
| 10 | pony | PASS | |
| 11 | rooster | PASS | |
| 12 | hen | PASS | |
| 13 | goose | WARN | Def says "big bird" — geese are medium-large, not distinctively "big"; minor |
| 14 | swan | PASS | |
| 15 | owl | PASS | |
| 16 | robin | PASS | |
| 17 | sparrow | PASS | |
| 18 | crow | WARN | "big black bird" — crows are medium-sized; ravens are big |
| 19 | eagle | PASS | |
| 20 | whale | PASS | |
| 21 | dolphin | WARN | "friendly" is anthropomorphic/subjective; "pointed nose" — technically a beak/snout/rostrum |
| 22 | shark | PASS | |
| 23 | turtle | PASS | |
| 24 | lizard | WARN | "small animal like a snake but with four legs" — lizards are not snake-like; they are their own group of reptiles |
| 25 | frog | PASS | |
| 26 | toad | WARN | "small bumpy animal that hops" — toads walk more than hop; that's frogs. Also "bumpy" is informal for warty skin |
| 27 | snail | PASS | |
| 28 | worm | PASS | |
| 29 | spider | PASS | |
| 30 | beetle | PASS | |
| 31 | ladybug | PASS | |
| 32 | butterfly | PASS | |
| 33 | caterpillar | PASS | |
| 34 | ant | WARN | "tiny bug that lives in a group" — ants are insects, not bugs (minor for kids) |
| 35 | bee | PASS | |
| 36 | squirrel | PASS | |
| 37 | raccoon | PASS | |
| 38 | skunk | WARN | "smells bad" — skunks only spray when threatened; they don't inherently smell bad all the time |
| 39 | beaver | PASS | |
| 40 | moose | PASS | |
| 41 | toast | PASS | |
| 42 | cereal | PASS | |
| 43 | pancake | PASS | |
| 44 | waffle | PASS | |
| 45 | oatmeal | PASS | |
| 46 | sandwich | PASS | |
| 47 | pretzel | PASS | |
| 48 | cracker | WARN | "thin dry food that crunches" — def is vague; should say "a thin, dry, crispy food" or similar |
| 49 | noodle | PASS | |
| 50 | muffin | PASS | |
| 51 | cupcake | PASS | |
| 52 | cookie | PASS | |
| 53 | doughnut | WARN | "round sweet food with a hole" — not all doughnuts have holes (filled doughnuts); minor |
| 54 | pudding | PASS | |
| 55 | jelly | PASS | |
| 56 | syrup | WARN | "thick sweet stuff" — "stuff" is very informal for a definition |
| 57 | honey | PASS | |
| 58 | popcorn | PASS | |
| 59 | yogurt | PASS | |
| 60 | grape | PASS | |
| 61 | cherry | PASS | |
| 62 | peach | PASS | |
| 63 | plum | WARN | "a small purple fruit" — plums can also be red, yellow, or green |
| 64 | melon | PASS | |
| 65 | berry | PASS | |
| 66 | lemon | PASS | |
| 67 | coconut | WARN | "a big brown fruit" — coconut is technically a drupe, not a fruit in the common sense; also only brown when mature; the outer husk is green |
| 68 | peanut | WARN | "a small food that grows in a shell in the ground" — peanut is a legume, not just "a small food"; definition is vague |
| 69 | celery | PASS | |
| 70 | broccoli | PASS | |
| 71 | lettuce | PASS | |
| 72 | pepper | PASS | |
| 73 | onion | WARN | "a round vegetable that makes you cry" — the "makes you cry" part is a side effect, not core meaning |
| 74 | mushroom | WARN | "a living thing with a cap on top and a stem" — mushrooms are fungi; calling it "a living thing" is vague. Should say "a type of fungus" |
| 75 | stew | PASS | |
| 76 | gravy | PASS | |
| 77 | feast | PASS | |
| 78 | snack | PASS | |
| 79 | treat | PASS | |
| 80 | slice | PASS | |
| 81 | elbow | PASS | |
| 82 | wrist | PASS | |
| 83 | ankle | PASS | |
| 84 | heel | PASS | |
| 85 | thumb | WARN | "the short fat finger on your hand" — "fat" could be considered inappropriate; "thick" is better |
| 86 | palm | PASS | |
| 87 | fist | PASS | |
| 88 | chin | PASS | |
| 89 | cheek | PASS | |
| 90 | forehead | PASS | |
| 91 | eyebrow | PASS | |
| 92 | eyelash | WARN | "tiny hairs on the edge of your eye" — should say "on the edge of your eyelid" |
| 93 | tongue | PASS | |
| 94 | throat | PASS | |
| 95 | shoulder | PASS | |
| 96 | hip | PASS | |
| 97 | spine | WARN | "the bones down your back that hold your body up" — spine is one column of vertebrae, not "bones" loosely |
| 98 | rib | WARN | "the bones around your chest that protect your body" — ribs protect heart and lungs specifically, not "your body" |
| 99 | skull | PASS | |
| 100 | muscle | PASS | |
| 101 | mitten | WARN | "a warm cover for your hand with no fingers" — mittens have a thumb section; "no fingers" is misleading. Should say "with one section for the thumb and one for the other fingers" |
| 102 | scarf | PASS | |
| 103 | hoodie | PASS | |
| 104 | vest | PASS | |
| 105 | apron | PASS | |
| 106 | sleeve | PASS | |
| 107 | pocket | PASS | |
| 108 | zipper | PASS | |
| 109 | button | PASS | |
| 110 | buckle | PASS | |
| 111 | lace | WARN | "the string you tie on a shoe" — lace also means decorative fabric; definition only covers shoelace meaning; example matches though |
| 112 | slipper | PASS | |
| 113 | sandal | PASS | |
| 114 | sneaker | PASS | |
| 115 | boot | PASS | |
| 116 | collar | PASS | |
| 117 | hem | PASS | |
| 118 | pajamas | PASS | |
| 119 | costume | PASS | |
| 120 | uniform | PASS | |
| 121 | blanket | PASS | |
| 122 | pillow | PASS | |
| 123 | towel | PASS | |
| 124 | soap | PASS | |
| 125 | sponge | PASS | |
| 126 | broom | PASS | |
| 127 | bucket | PASS | |
| 128 | ladder | PASS | |
| 129 | drawer | PASS | |
| 130 | shelf | PASS | |
| 131 | closet | PASS | |
| 132 | curtain | PASS | |
| 133 | rug | PASS | |
| 134 | lamp | PASS | |
| 135 | candle | PASS | |
| 136 | vase | PASS | |
| 137 | frame | PASS | |
| 138 | envelope | PASS | |
| 139 | stamp | PASS | |
| 140 | package | PASS | |
| 141 | scissors | PASS | |
| 142 | glue | PASS | |
| 143 | tape | PASS | |
| 144 | crayon | PASS | |
| 145 | chalk | PASS | |
| 146 | eraser | PASS | |
| 147 | ruler | PASS | |
| 148 | thermometer | PASS | |
| 149 | battery | PASS | |
| 150 | switch | PASS | |
| 151 | barn | PASS | |
| 152 | stable | PASS | |
| 153 | cabin | PASS | |
| 154 | cottage | PASS | |
| 155 | castle | WARN | "a big stone building where kings live" — kings lived in castles historically; present tense "live" is inaccurate |
| 156 | tower | PASS | |
| 157 | bridge | PASS | |
| 158 | tunnel | PASS | |
| 159 | harbor | PASS | |
| 160 | island | PASS | |
| 161 | forest | PASS | |
| 162 | meadow | PASS | |
| 163 | pond | PASS | |
| 164 | stream | PASS | |
| 165 | cliff | PASS | |
| 166 | cave | PASS | |
| 167 | desert | PASS | |
| 168 | jungle | PASS | |
| 169 | swamp | PASS | |
| 170 | valley | PASS | |
| 171 | storm | PASS | |
| 172 | thunder | PASS | |
| 173 | lightning | PASS | |
| 174 | rainbow | PASS | |
| 175 | breeze | PASS | |
| 176 | frost | PASS | |
| 177 | icicle | PASS | |
| 178 | puddle | PASS | |
| 179 | mud | PASS | |
| 180 | dust | PASS | |
| 181 | dew | PASS | |
| 182 | fog | PASS | |
| 183 | hail | PASS | |
| 184 | blizzard | PASS | |
| 185 | drought | PASS | |
| 186 | flood | PASS | |
| 187 | petal | PASS | |
| 188 | stem | PASS | |
| 189 | root | PASS | |
| 190 | thorn | PASS | |
| 191 | vine | PASS | |
| 192 | moss | PASS | |
| 193 | acorn | PASS | |
| 194 | pinecone | PASS | |
| 195 | seed | PASS | |
| 196 | crawl | PASS | |
| 197 | leap | PASS | |
| 198 | skip | PASS | |
| 199 | stomp | PASS | |
| 200 | tiptoe | PASS | |
| 201 | march | PASS | |
| 202 | dash | PASS | |
| 203 | chase | PASS | |
| 204 | grab | PASS | |
| 205 | toss | PASS | |
| 206 | catch | PASS | |
| 207 | squeeze | PASS | |
| 208 | stretch | PASS | |
| 209 | bend | PASS | |
| 210 | twist | PASS | |
| 211 | shake | PASS | |
| 212 | stir | PASS | |
| 213 | pour | PASS | |
| 214 | spill | PASS | |
| 215 | drip | PASS | |
| 216 | splash | PASS | |
| 217 | float | PASS | |
| 218 | sink | PASS | |
| 219 | melt | PASS | |
| 220 | freeze | PASS | |
| 221 | peel | PASS | |
| 222 | chop | PASS | |
| 223 | grate | PASS | |
| 224 | spread | PASS | |
| 225 | sprinkle | PASS | |
| 226 | scoop | PASS | |
| 227 | whisper | PASS | |
| 228 | shout | PASS | |
| 229 | giggle | PASS | |
| 230 | howl | PASS | |
| 231 | bark | FAIL | Def says "the tough outer covering of a tree" but this is the TREE BARK meaning. For a children's vocab list, "bark" primarily means the sound a dog makes. Def-example match is fine for tree bark, but the primary meaning expected at this level is wrong. |
| 232 | roar | PASS | |
| 233 | hum | PASS | |
| 234 | clap | PASS | |
| 235 | wave | PASS | |
| 236 | nod | PASS | |
| 237 | peek | PASS | |
| 238 | stare | PASS | |
| 239 | glance | PASS | |
| 240 | search | PASS | |
| 241 | discover | PASS | |
| 242 | notice | PASS | |
| 243 | wonder | PASS | |
| 244 | imagine | PASS | |
| 245 | pretend | PASS | |
| 246 | promise | PASS | |
| 247 | remind | WARN | "to help someone recall" — "recall" is harder than "remind"; should say "to help someone remember" |
| 248 | forget | PASS | |
| 249 | belong | PASS | |
| 250 | share | PASS | |
| 251 | trade | PASS | |
| 252 | borrow | PASS | |
| 253 | lend | PASS | |
| 254 | gather | PASS | |
| 255 | collect | PASS | |
| 256 | stack | PASS | |
| 257 | wrap | PASS | |
| 258 | unwrap | PASS | |
| 259 | tug | PASS | |
| 260 | drag | PASS | |
| 261 | shove | PASS | |
| 262 | tuck | PASS | |
| 263 | hang | PASS | |
| 264 | fasten | PASS | |
| 265 | attach | PASS | |
| 266 | repair | PASS | |
| 267 | create | PASS | |
| 268 | design | PASS | |
| 269 | measure | PASS | |
| 270 | weigh | PASS | |
| 271 | count | PASS | |
| 272 | sort | PASS | |
| 273 | match | PASS | |
| 274 | deliver | PASS | |
| 275 | fetch | PASS | |
| 276 | vanish | PASS | |
| 277 | tiny | PASS | |
| 278 | huge | PASS | |
| 279 | enormous | PASS | |
| 280 | narrow | PASS | |
| 281 | wide | PASS | |
| 282 | steep | PASS | |
| 283 | shallow | PASS | |
| 284 | deep | PASS | |
| 285 | thick | PASS | |
| 286 | thin | PASS | |
| 287 | smooth | PASS | |
| 288 | rough | PASS | |
| 289 | sharp | PASS | |
| 290 | dull | PASS | |
| 291 | shiny | PASS | |
| 292 | damp | PASS | |
| 293 | soaking | PASS | |
| 294 | dry | PASS | |
| 295 | sticky | WARN | "something that holds on to your fingers" — def is awkward/garbled. Should say "covered in something that clings to whatever touches it" |
| 296 | slimy | PASS | |
| 297 | fluffy | PASS | |
| 298 | fuzzy | PASS | |
| 299 | cozy | PASS | |
| 300 | chilly | PASS | |
| 301 | freezing | PASS | |
| 302 | boiling | WARN | "so hot with lots of bubbles" — incomplete sentence / garbled phrasing; should say "so hot that bubbles form" |
| 303 | warm | PASS | |
| 304 | fierce | PASS | |
| 305 | gentle | PASS | |
| 306 | brave | PASS | |
| 307 | shy | WARN | "afraid to talk to new people" — shy is broader than just "afraid"; it's feeling nervous or hesitant, not just with new people |
| 308 | proud | PASS | |
| 309 | curious | PASS | |
| 310 | grumpy | PASS | |
| 311 | cheerful | PASS | |
| 312 | lonely | PASS | |
| 313 | calm | PASS | |
| 314 | wild | PASS | |
| 315 | tame | PASS | |
| 316 | plain | PASS | |
| 317 | fancy | PASS | |
| 318 | ripe | PASS | |
| 319 | rotten | PASS | |
| 320 | fresh | PASS | |
| 321 | stale | PASS | |
| 322 | bitter | PASS | |
| 323 | sour | PASS | |
| 324 | salty | PASS | |
| 325 | juicy | PASS | |
| 326 | crunchy | PASS | |
| 327 | creamy | PASS | |
| 328 | silent | PASS | |
| 329 | loud | PASS | |
| 330 | hollow | PASS | |
| 331 | solid | PASS | |
| 332 | loose | PASS | |
| 333 | tight | PASS | |
| 334 | crooked | PASS | |
| 335 | straight | PASS | |
| 336 | crowded | PASS | |
| 337 | empty | PASS | |
| 338 | whole | PASS | |
| 339 | spare | PASS | |
| 340 | certain | PASS | |
| 341 | strange | PASS | |
| 342 | wonderful | PASS | |
| 343 | terrible | PASS | |
| 344 | perfect | PASS | |
| 345 | ugly | PASS | |
| 346 | beautiful | PASS | |
| 347 | clever | PASS | |
| 348 | foolish | PASS | |
| 349 | greedy | PASS | |
| 350 | generous | PASS | |
| 351 | patient | PASS | |
| 352 | stubborn | PASS | |
| 353 | lazy | PASS | |
| 354 | busy | PASS | |
| 355 | clumsy | PASS | |
| 356 | graceful | PASS | |
| 357 | quickly | PASS | |
| 358 | slowly | PASS | |
| 359 | quietly | PASS | |
| 360 | loudly | PASS | |
| 361 | gently | PASS | |
| 362 | suddenly | PASS | |
| 363 | already | PASS | |
| 364 | almost | PASS | |
| 365 | barely | PASS | |
| 366 | perhaps | PASS | |
| 367 | exactly | PASS | |
| 368 | instead | PASS | |
| 369 | anyway | PASS | |
| 370 | forever | PASS | |
| 371 | apart | PASS | |
| 372 | together | PASS | |
| 373 | forward | PASS | |
| 374 | backward | PASS | |
| 375 | sideways | PASS | |
| 376 | beneath | PASS | |
| 377 | above | PASS | |
| 378 | below | PASS | |
| 379 | beside | PASS | |
| 380 | between | PASS | |
| 381 | among | PASS | |
| 382 | toward | PASS | |
| 383 | against | PASS | |
| 384 | through | PASS | |
| 385 | across | PASS | |
| 386 | along | PASS | |
| 387 | around | PASS | |
| 388 | beyond | PASS | |
| 389 | during | PASS | |
| 390 | until | PASS | |
| 391 | since | PASS | |
| 392 | whether | PASS | |
| 393 | while | PASS | |
| 394 | besides | PASS | |
| 395 | within | PASS | |
| 396 | without | PASS | |
| 397 | throughout | PASS | |
| 398 | upon | PASS | |
| 399 | pick up | PASS | |
| 400 | put down | PASS | |
| 401 | look at | PASS | |
| 402 | come back | PASS | |
| 403 | sit down | PASS | |
| 404 | stand up | PASS | |
| 405 | wake up | PASS | |
| 406 | give up | PASS | |
| 407 | find out | PASS | |
| 408 | turn off | PASS | |
| 409 | turn on | PASS | |
| 410 | fall down | PASS | |
| 411 | get up | PASS | |
| 412 | look out | PASS | |
| 413 | hold on | PASS | |
| 414 | clean up | PASS | |
| 415 | hurry up | PASS | |
| 416 | calm down | PASS | |
| 417 | try on | PASS | |
| 418 | throw away | PASS | |
| 419 | run out | PASS | |
| 420 | come in | PASS | |
| 421 | go away | PASS | |
| 422 | show off | PASS | |
| 423 | figure out | PASS | |
| 424 | excited | PASS | |
| 425 | nervous | PASS | |
| 426 | frightened | PASS | |
| 427 | surprised | PASS | |
| 428 | confused | PASS | |
| 429 | disappointed | PASS | |
| 430 | frustrated | PASS | |
| 431 | jealous | PASS | |
| 432 | embarrassed | PASS | |
| 433 | worried | PASS | |
| 434 | grateful | PASS | |
| 435 | annoyed | PASS | |
| 436 | bored | PASS | |
| 437 | amazed | PASS | |
| 438 | terrified | PASS | |
| 439 | furious | PASS | |
| 440 | miserable | PASS | |
| 441 | relieved | PASS | |
| 442 | peaceful | PASS | |
| 443 | comfortable | PASS | |
| 444 | uncomfortable | PASS | |
| 445 | exhausted | PASS | |
| 446 | delighted | PASS | |
| 447 | gloomy | PASS | |
| 448 | hopeful | PASS | |
| 449 | cranky | PASS | |
| 450 | content | PASS | |
| 451 | eager | PASS | |
| 452 | homesick | PASS | |
| 453 | ashamed | PASS | |
| 454 | before | PASS | |
| 455 | after | PASS | |
| 456 | next | PASS | |
| 457 | then | PASS | |
| 458 | finally | PASS | |
| 459 | meanwhile | PASS | |
| 460 | soon | PASS | |
| 461 | later | PASS | |
| 462 | early | PASS | |
| 463 | late | PASS | |
| 464 | beginning | PASS | |
| 465 | middle | PASS | |
| 466 | ending | PASS | |
| 467 | moment | PASS | |
| 468 | sudden | PASS | |
| 469 | recent | PASS | |
| 470 | daily | PASS | |
| 471 | weekly | PASS | |
| 472 | whenever | PASS | |
| 473 | once | PASS | |
| 474 | twice | PASS | |
| 475 | often | PASS | |
| 476 | nowadays | PASS | |
| 477 | dozen | PASS | |
| 478 | half | PASS | |
| 479 | pair | PASS | |
| 480 | entire | PASS | |
| 481 | double | PASS | |
| 482 | single | PASS | |
| 483 | plenty | PASS | |
| 484 | several | PASS | |
| 485 | few | PASS | |
| 486 | many | PASS | |
| 487 | none | PASS | |
| 488 | bunch | PASS | |
| 489 | pile | PASS | |
| 490 | heap | PASS | |
| 491 | piece | PASS | |
| 492 | portion | PASS | |
| 493 | amount | PASS | |
| 494 | total | PASS | |
| 495 | extra | PASS | |
| 496 | enough | PASS | |
| 497 | less | PASS | |
| 498 | more | PASS | |
| 499 | quarter | PASS | |
| 500 | equal | PASS | |
| 501 | average | PASS | |
| 502 | shadow | PASS | |
| 503 | echo | PASS | |
| 504 | secret | PASS | |
| 505 | surprise | PASS | |
| 506 | mistake | PASS | |
| 507 | adventure | PASS | |
| 508 | treasure | PASS | |
| 509 | journey | PASS | |
| 510 | village | PASS | |
| 511 | dock | PASS | |
| 512 | crowd | PASS | |
| 513 | trail | PASS | |
| 514 | footprint | PASS | |
| 515 | pattern | PASS | |
| 516 | riddle | PASS | |
| 517 | poem | WARN | "words that sound nice together" — poems don't have to sound nice; they are a form of literary expression using rhythm, imagery, or structured language |
| 518 | tale | PASS | |
| 519 | legend | PASS | |
| 520 | character | PASS | |
| 521 | chapter | PASS | |
| 522 | title | PASS | |
| 523 | author | PASS | |
| 524 | paw | PASS | |
| 525 | claw | PASS | |
| 526 | feather | PASS | |
| 527 | fur | PASS | |
| 528 | scale | PASS | |
| 529 | wing | PASS | |
| 530 | beak | PASS | |
| 531 | nest | PASS | |
| 532 | hive | PASS | |
| 533 | den | PASS | |
| 534 | burrow | PASS | |
| 535 | trap | PASS | |
| 536 | leash | PASS | |
| 537 | tag | PASS | |
| 538 | whisker | WARN | "long hair on a cat's face" — whiskers are on many animals, not just cats; also they are sensory organs, not just "hair" |
| 539 | tail | PASS | |
| 540 | hoof | PASS | |
| 541 | mane | PASS | |
| 542 | flock | PASS | |
| 543 | herd | PASS | |
| 544 | pack | PASS | |
| 545 | droplet | PASS | |
| 546 | ripple | PASS | |
| 547 | bubble | PASS | |
| 548 | flame | PASS | |
| 549 | spark | PASS | |
| 550 | smoke | PASS | |
| 551 | ash | PASS | |
| 552 | dawn | PASS | |
| 553 | dusk | PASS | |
| 554 | midnight | PASS | |
| 555 | noon | PASS | |
| 556 | passenger | PASS | |
| 557 | neighbor | PASS | |
| 558 | stranger | PASS | |
| 559 | parade | PASS | |
| 560 | audience | PASS | |
| 561 | crew | PASS | |
| 562 | coach | PASS | |
| 563 | chef | PASS | |
| 564 | mayor | PASS | |
| 565 | inventor | PASS | |
| 566 | princess | PASS | |
| 567 | knight | PASS | |
| 568 | wizard | PASS | |
| 569 | giant | PASS | |
| 570 | dwarf | PASS | |
| 571 | monster | PASS | |
| 572 | dragon | PASS | |
| 573 | fairy | PASS | |
| 574 | shield | PASS | |
| 575 | sword | PASS | |
| 576 | wand | PASS | |
| 577 | throne | PASS | |
| 578 | crown | PASS | |
| 579 | wobble | PASS | |
| 580 | tumble | PASS | |
| 581 | snuggle | PASS | |
| 582 | nibble | PASS | |
| 583 | snore | PASS | |
| 584 | yawn | PASS | |
| 585 | shiver | PASS | |
| 586 | bloom | PASS | |
| 587 | sprout | PASS | |
| 588 | wilt | PASS | |
| 589 | scattered | PASS | |
| 590 | rascal | PASS | |
| 591 | gigantic | PASS | |
| 592 | itsy | WARN | "very very tiny; so small" — "itsy" is informal/baby-talk and not a standard dictionary word; typically only used in "itsy-bitsy" |
| 593 | whirl | PASS | |
| 594 | sparkle | PASS | |
| 595 | flutter | PASS | |
| 596 | hear | PASS | |
| 597 | lose | PASS | |
| 598 | teach | PASS | |
| 599 | take | PASS | |
| 600 | than | PASS | |
| 601 | describe | PASS | |
| 602 | explain | PASS | |
| 603 | solve | PASS | |
| 604 | complete | PASS | |
| 605 | arrange | PASS | |
| 606 | decide | PASS | |
| 607 | suppose | PASS | |
| 608 | mention | PASS | |
| 609 | realize | PASS | |
| 610 | repeat | PASS | |
| 611 | separate | PASS | |
| 612 | struggle | PASS | |
| 613 | succeed | PASS | |
| 614 | surround | PASS | |
| 615 | wander | PASS | |
| 616 | ancient | PASS | |
| 617 | modern | PASS | |
| 618 | brilliant | PASS | |
| 619 | fragile | PASS | |
| 620 | sturdy | PASS | |
| 621 | swift | PASS | |
| 622 | anxious | PASS | |
| 623 | setting | PASS | |
| 624 | plot | PASS | |
| 625 | paragraph | PASS | |
| 626 | sentence | PASS | |
| 627 | fiction | PASS | |
| 628 | nonfiction | PASS | |
| 629 | main idea | PASS | |
| 630 | detail | PASS | |
| 631 | cause | PASS | |
| 632 | effect | PASS | |
| 633 | habitat | PASS | |
| 634 | insect | PASS | |
| 635 | mammal | PASS | |
| 636 | reptile | PASS | |
| 637 | liquid | PASS | |
| 638 | gas | PASS | |
| 639 | energy | PASS | |
| 640 | force | PASS | |
| 641 | magnet | WARN | "something that pulls some metals" — magnets can also push (repel); definition only covers attraction |
| 642 | soil | PASS | |
| 643 | climate | PASS | |
| 644 | season | PASS | |
| 645 | citizen | PASS | |
| 646 | government | PASS | |
| 647 | law | PASS | |
| 648 | rule | PASS | |
| 649 | map | PASS | |
| 650 | globe | PASS | |
| 651 | continent | PASS | |
| 652 | country | PASS | |
| 653 | state | PASS | |
| 654 | city | PASS | |
| 655 | border | PASS | |
| 656 | freedom | PASS | |
| 657 | election | PASS | |
| 658 | subtract | PASS | |
| 659 | multiply | PASS | |
| 660 | divide | PASS | |
| 661 | sum | PASS | |
| 662 | graph | PASS | |
| 663 | chart | PASS | |
| 664 | data | PASS | |
| 665 | length | PASS | |
| 666 | width | PASS | |
| 667 | height | PASS | |
| 668 | area | PASS | |
| 669 | shape | PASS | |
| 670 | angle | PASS | |
| 671 | triple | PASS | |
| 672 | gradually | PASS | |
| 673 | immediately | PASS | |
| 674 | afterward | PASS | |
| 675 | recently | PASS | |
| 676 | frequently | PASS | |
| 677 | rarely | PASS | |
| 678 | occasionally | PASS | |
| 679 | however | PASS | |
| 680 | therefore | PASS | |
| 681 | otherwise | PASS | |
| 682 | turn into | PASS | |
| 683 | look forward to | PASS | |
| 684 | make up | PASS | |
| 685 | point out | PASS | |
| 686 | come across | PASS | |
| 687 | break down | PASS | |
| 688 | carry out | PASS | |
| 689 | set up | PASS | |
| 690 | courageous | PASS | |
| 691 | honest | PASS | |
| 692 | loyal | PASS | |
| 693 | selfish | PASS | |
| 694 | thoughtful | PASS | |
| 695 | determined | PASS | |
| 696 | about | PASS | |
| 697 | act | PASS | |
| 698 | action | PASS | |
| 699 | add | PASS | |
| 700 | address | PASS | |
| 701 | adult | PASS | |
| 702 | afraid | PASS | |
| 703 | again | PASS | |
| 704 | agree | PASS | |
| 705 | alive | PASS | |
| 706 | alone | PASS | |
| 707 | also | PASS | |
| 708 | always | PASS | |
| 709 | any | PASS | |
| 710 | appear | PASS | |
| 711 | arm | PASS | |
| 712 | arrive | PASS | |
| 713 | ask | PASS | |
| 714 | asleep | PASS | |
| 715 | attack | PASS | |
| 716 | attempt | PASS | |
| 717 | attention | PASS | |
| 718 | awake | PASS | |
| 719 | backpack | PASS | |
| 720 | balance | PASS | |
| 721 | balloon | PASS | |
| 722 | bare | PASS | |
| 723 | bargain | PASS | |
| 724 | base | PASS | |
| 725 | basic | PASS | |
| 726 | battle | PASS | |
| 727 | beach | PASS | |
| 728 | beam | PASS | |
| 729 | because | PASS | |
| 730 | become | PASS | |
| 731 | beg | PASS | |
| 732 | begin | PASS | |
| 733 | behavior | PASS | |
| 734 | believe | PASS | |
| 735 | better | PASS | |
| 736 | bicycle | PASS | |
| 737 | blink | PASS | |
| 738 | block | PASS | |
| 739 | blossom | PASS | |
| 740 | bossy | PASS | |
| 741 | bounce | PASS | |
| 742 | breakfast | PASS | |
| 743 | breathe | PASS | |
| 744 | bright | PASS | |
| 745 | bring | PASS | |
| 746 | broad | PASS | |
| 747 | build | PASS | |
| 748 | bundle | PASS | |
| 749 | butter | PASS | |
| 750 | cactus | PASS | |
| 751 | calendar | PASS | |
| 752 | camel | WARN | "a big desert animal with bumps on its back" — they are called humps, not bumps |
| 753 | camp | PASS | |
| 754 | capture | PASS | |
| 755 | careful | PASS | |
| 756 | carpet | PASS | |
| 757 | cart | PASS | |
| 758 | carve | PASS | |
| 759 | ceiling | PASS | |
| 760 | center | PASS | |
| 761 | chance | PASS | |
| 762 | change | PASS | |
| 763 | choice | PASS | |
| 764 | circle | PASS | |
| 765 | climb | PASS | |
| 766 | close | PASS | |
| 767 | clue | PASS | |
| 768 | coast | PASS | |
| 769 | comfort | PASS | |
| 770 | common | PASS | |
| 771 | complain | PASS | |
| 772 | confuse | PASS | |
| 773 | connect | PASS | |
| 774 | corner | PASS | |
| 775 | cost | PASS | |
| 776 | cotton | PASS | |
| 777 | course | PASS | |
| 778 | crash | PASS | |
| 779 | make | PASS | |
| 780 | crumble | PASS | |
| 781 | cuddle | PASS | |
| 782 | custom | PASS | |
| 783 | cycle | PASS | |
| 784 | danger | PASS | |
| 785 | dark | PASS | |
| 786 | deal | PASS | |
| 787 | delay | PASS | |
| 788 | delight | PASS | |
| 789 | deny | PASS | |
| 790 | depend | PASS | |
| 791 | destroy | PASS | |
| 792 | dig | PASS | |
| 793 | dinner | PASS | |
| 794 | find | PASS | |
| 795 | distance | PASS | |
| 796 | dizzy | PASS | |
| 797 | dollar | PASS | |
| 798 | donate | PASS | |
| 799 | doorway | PASS | |
| 800 | downstairs | PASS | |
| 801 | drift | PASS | |
| 802 | drown | PASS | |
| 803 | earn | PASS | |
| 804 | earth | PASS | |
| 805 | edge | PASS | |
| 806 | enter | PASS | |
| 807 | escape | PASS | |
| 808 | exact | PASS | |
| 809 | fair | PASS | |
| 810 | famous | PASS | |
| 811 | far | PASS | |
| 812 | farm | PASS | |
| 813 | fence | PASS | |
| 814 | field | PASS | |
| 815 | fill | PASS | |
| 816 | finish | PASS | |
| 817 | fit | PASS | |
| 818 | flour | PASS | |
| 819 | foam | PASS | |
| 820 | fold | PASS | |
| 821 | follow | PASS | |
| 822 | fork | PASS | |
| 823 | friendship | PASS | |
| 824 | frighten | PASS | |
| 825 | front | PASS | |
| 826 | frozen | PASS | |
| 827 | gentleman | PASS | |
| 828 | glad | PASS | |
| 829 | glide | PASS | |
| 830 | glitter | PASS | |
| 831 | goal | PASS | |
| 832 | grasp | PASS | |
| 833 | greet | PASS | |
| 834 | grin | PASS | |
| 835 | groan | PASS | |
| 836 | grow | PASS | |
| 837 | guard | PASS | |
| 838 | guess | PASS | |
| 839 | habit | PASS | |
| 840 | hallway | PASS | |
| 841 | handful | PASS | |
| 842 | harm | PASS | |
| 843 | harvest | PASS | |
| 844 | heal | PASS | |
| 845 | hidden | PASS | |
| 846 | hint | PASS | |
| 847 | history | PASS | |
| 848 | holiday | PASS | |
| 849 | hop | PASS | |
| 850 | horizon | PASS | |
| 851 | hurt | PASS | |
| 852 | hurry | PASS | |
| 853 | idea | PASS | |
| 854 | ignore | PASS | |
| 855 | include | PASS | |
| 856 | inside | PASS | |
| 857 | invite | PASS | |
| 858 | jacket | PASS | |
| 859 | judge | PASS | |
| 860 | jump | PASS | |
| 861 | key | PASS | |
| 862 | kind | PASS | |
| 863 | knee | PASS | |
| 864 | kneel | PASS | |
| 865 | knock | PASS | |
| 866 | lantern | PASS | |
| 867 | laugh | PASS | |
| 868 | leaf | PASS | |
| 869 | leak | PASS | |
| 870 | learn | PASS | |
| 871 | least | PASS | |
| 872 | library | PASS | |
| 873 | limit | PASS | |
| 874 | listen | PASS | |
| 875 | lunch | PASS | |
| 876 | machine | PASS | |
| 877 | magic | PASS | |
| 878 | major | PASS | |
| 879 | marble | PASS | |
| 880 | mask | PASS | |
| 881 | matter | PASS | |
| 882 | memory | PASS | |
| 883 | message | PASS | |
| 884 | minute | PASS | |
| 885 | mirror | PASS | |
| 886 | mist | PASS | |
| 887 | mix | PASS | |
| 888 | model | PASS | |
| 889 | mood | PASS | |
| 890 | move | PASS | |
| 891 | mystery | PASS | |
| 892 | nature | PASS | |
| 893 | near | PASS | |
| 894 | neatly | PASS | |
| 895 | never | PASS | |
| 896 | noisy | PASS | |
| 897 | north | WARN | "the way toward the top when you look at a flat picture of Earth" — awkward phrasing; "the direction toward the top of a map" is cleaner |
| 898 | note | PASS | |
| 899 | object | PASS | |
| 900 | ocean | PASS | |
| 901 | offer | PASS | |
| 902 | opinion | PASS | |
| 903 | opposite | PASS | |
| 904 | order | PASS | |
| 905 | outside | PASS | |
| 906 | over | PASS | |
| 907 | palace | PASS | |
| 908 | path | PASS | |
| 909 | pause | PASS | |
| 910 | picnic | PASS | |
| 911 | planet | PASS | |
| 912 | plastic | PASS | |
| 913 | playground | PASS | |
| 914 | polite | PASS | |
| 915 | praise | PASS | |
| 916 | prepare | PASS | |
| 917 | price | PASS | |
| 918 | prize | PASS | |
| 919 | protect | PASS | |
| 920 | quiet | PASS | |
| 921 | quiz | PASS | |
| 922 | raise | PASS | |
| 923 | range | PASS | |
| 924 | reach | PASS | |
| 925 | recycle | PASS | |
| 926 | refund | PASS | |
| 927 | relax | PASS | |
| 928 | rescue | PASS | |
| 929 | respect | PASS | |
| 930 | result | PASS | |
| 931 | return | PASS | |
| 932 | river | PASS | |
| 933 | role | PASS | |
| 934 | route | PASS | |
| 935 | safe | PASS | |
| 936 | sail | PASS | |
| 937 | save | PASS | |
| 938 | scared | PASS | |
| 939 | scatter | PASS | |
| 940 | score | PASS | |
| 941 | shade | PASS | |
| 942 | shore | PASS | |
| 943 | signal | PASS | |
| 944 | simple | PASS | |
| 945 | slippery | PASS | |
| 946 | smell | PASS | |
| 947 | snap | PASS | |
| 948 | soak | PASS | |
| 949 | special | PASS | |
| 950 | store | PASS | |
| 951 | strong | PASS | |
| 952 | stuck | PASS | |
| 953 | suggest | PASS | |
| 954 | support | PASS | |
| 955 | surface | PASS | |
| 956 | swallow | PASS | |
| 957 | sweep | PASS | |
| 958 | sweet | PASS | |
| 959 | talent | PASS | |
| 960 | taste | PASS | |
| 961 | team | PASS | |
| 962 | tease | PASS | |
| 963 | temperature | PASS | |
| 964 | tend | PASS | |
| 965 | tightly | PASS | |
| 966 | little | PASS | |
| 967 | track | PASS | |
| 968 | travel | PASS | |
| 969 | trick | PASS | |
| 970 | trust | PASS | |
| 971 | turn | PASS | |
| 972 | under | PASS | |
| 973 | upstairs | PASS | |
| 974 | usual | PASS | |
| 975 | visit | PASS | |
| 976 | voice | PASS | |
| 977 | vote | PASS | |
| 978 | wait | PASS | |
| 979 | warmth | PASS | |
| 980 | warn | PASS | |
| 981 | waterfall | PASS | |
| 982 | weather | PASS | |
| 983 | wheel | PASS | |
| 984 | yesterday | PASS | |
| 985 | admiral | PASS | |
| 986 | album | PASS | |
| 987 | alley | PASS | |
| 988 | amber | WARN | "a warm yellow color" — amber is primarily fossilized tree resin; the color meaning is secondary. For a vocab list, the primary meaning should be the resin/gemstone |
| 989 | antenna | PASS | |
| 990 | applause | PASS | |
| 991 | apricot | PASS | |
| 992 | arch | PASS | |
| 993 | atlas | PASS | |
| 994 | avalanche | PASS | |
| 995 | badge | PASS | |
| 996 | bagpipe | WARN | "a thing you blow into, with tubes and a bag, to make music" — should say "a musical instrument"; "a thing" is too vague |
| 997 | balcony | PASS | |
| 998 | banjo | WARN | "a round thing with strings that you pull to make music" — should say "a musical instrument with a round body and strings you pluck"; "round thing" is garble-residue vague |
| 999 | banner | PASS | |
| 1000 | basin | PASS | |
| 1001 | bay | PASS | |
| 1002 | beacon | PASS | |
| 1003 | bead | PASS | |
| 1004 | beeswax | PASS | |
| 1005 | bellows | PASS | |
| 1006 | binoculars | PASS | |
| 1007 | birch | PASS | |
| 1008 | biscuit | PASS | |
| 1009 | blacksmith | PASS | |
| 1010 | blaze | PASS | |
| 1011 | blueprint | PASS | |
| 1012 | bluff | PASS | |
| 1013 | bobsled | WARN | "a fast thing that slides down an icy path" — should say "a small vehicle/sled"; "a fast thing" is garble-residue vague |
| 1014 | bolt | PASS | |
| 1015 | bonfire | PASS | |
| 1016 | bookshelf | PASS | |
| 1017 | bracelet | PASS | |
| 1018 | bramble | PASS | |
| 1019 | brass | PASS | |
| 1020 | bridle | PASS | |
| 1021 | broth | PASS | |
| 1022 | bugle | PASS | |
| 1023 | bulb | PASS | |
| 1024 | bulletin | PASS | |
| 1025 | bunker | PASS | |
| 1026 | buoy | PASS | |
| 1027 | canal | PASS | |
| 1028 | canopy | PASS | |
| 1029 | caribou | PASS | |
| 1030 | carousel | PASS | |
| 1031 | cartwheel | PASS | |
| 1032 | cashew | PASS | |
| 1033 | cedar | PASS | |
| 1034 | cellar | PASS | |
| 1035 | chapel | PASS | |
| 1036 | chariot | WARN | "a thing with two round parts pulled by horses, used long ago" — should say "a two-wheeled vehicle pulled by horses"; "a thing with two round parts" is garble-residue vague |
| 1037 | chestnut | PASS | |
| 1038 | chisel | PASS | |
| 1039 | chord | PASS | |
| 1040 | cider | PASS | |
| 1041 | clam | PASS | |
| 1042 | cloak | PASS | |
| 1043 | cobblestone | PASS | |
| 1044 | cocoon | PASS | |
| 1045 | comet | PASS | |
| 1046 | cork | WARN | "a soft light thing used to close bottles" — should say "a soft, lightweight material/stopper"; "a soft light thing" is garble-residue vague |
| 1047 | corral | PASS | |
| 1048 | cradle | PASS | |
| 1049 | crest | PASS | |
| 1050 | crumb | PASS | |
| 1051 | cuff | PASS | |
| 1052 | cypress | PASS | |
| 1053 | dagger | PASS | |
| 1054 | dandelion | PASS | |
| 1055 | deck | PASS | |
| 1056 | delta | PASS | |
| 1057 | dinghy | PASS | |
| 1058 | dome | PASS | |
| 1059 | donkey | PASS | |
| 1060 | doorbell | PASS | |
| 1061 | drawbridge | PASS | |
| 1062 | drumstick | PASS | |
| 1063 | dune | PASS | |
| 1064 | easel | PASS | |
| 1065 | elm | PASS | |
| 1066 | ember | PASS | |
| 1067 | emerald | PASS | |
| 1068 | falcon | PASS | |
| 1069 | fiddle | WARN | "a thing with strings that you pull to make music" — should say "a stringed instrument played with a bow, like a violin"; fiddles are bowed, not plucked/"pulled" |
| 1070 | fig | PASS | |
| 1071 | fjord | WARN | "a long narrow strip of sea between tall rocks" — should say "between steep cliffs or mountains"; "tall rocks" undersells the geography |
| 1072 | flint | PASS | |
| 1073 | forge | PASS | |
| 1074 | fresco | PASS | |
| 1075 | gale | PASS | |
| 1076 | galley | PASS | |
| 1077 | garnet | PASS | |
| 1078 | gazelle | PASS | |
| 1079 | geyser | PASS | |
| 1080 | gong | WARN | "a big flat round metal thing that makes a deep sound when you hit it" — should say "a large metal disk/instrument"; "a big flat round metal thing" is garble-residue vague |
| 1081 | granite | PASS | |
| 1082 | grapevine | PASS | |
| 1083 | gravel | PASS | |
| 1084 | griddle | PASS | |
| 1085 | grove | PASS | |
| 1086 | gutter | PASS | |
| 1087 | hammock | PASS | |
| 1088 | harp | WARN | "a big thing with many strings that you pull to make music" — should say "a large musical instrument with strings you pluck"; "a big thing" is garble-residue vague |
| 1089 | hazel | PASS | |
| 1090 | hearth | PASS | |
| 1091 | heron | PASS | |
| 1092 | hickory | PASS | |
| 1093 | hilltop | PASS | |
| 1094 | holly | PASS | |
| 1095 | honeycomb | PASS | |
| 1096 | horseshoe | PASS | |
| 1097 | hourglass | PASS | |
| 1098 | husk | PASS | |
| 1099 | ibis | PASS | |
| 1100 | igloo | PASS | |
| 1101 | ivy | PASS | |
| 1102 | jade | PASS | |
| 1103 | javelin | PASS | |
| 1104 | kelp | PASS | |
| 1105 | kennel | PASS | |
| 1106 | kindle | PASS | |
| 1107 | kingfisher | PASS | |
| 1108 | knapsack | PASS | |
| 1109 | lagoon | PASS | |
| 1110 | latch | PASS | |
| 1111 | lava | PASS | |
| 1112 | levee | PASS | |
| 1113 | lichen | WARN | "a flat, dry thing that grows on rocks and trees" — lichen is a symbiotic organism (fungus + algae); calling it "a flat, dry thing" is garble-residue vague |
| 1114 | locket | PASS | |
| 1115 | loom | PASS | |
| 1116 | lynx | WARN | "a wild cat with tall, sharp ears" — lynx ears have tufts; they are not "sharp". Should say "pointed ears with tufts" |
| 1117 | mango | PASS | |
| 1118 | mantle | PASS | |
| 1119 | maple | PASS | |
| 1120 | marsh | PASS | |
| 1121 | mast | PASS | |
| 1122 | moat | PASS | |
| 1123 | mortar | PASS | |
| 1124 | mosaic | PASS | |
| 1125 | mulberry | PASS | |
| 1126 | muzzle | PASS | |
| 1127 | nectar | PASS | |
| 1128 | nettle | PASS | |
| 1129 | nozzle | PASS | |
| 1130 | nutmeg | WARN | "something from a seed that adds taste to food" — should say "a spice made from a seed"; "something from a seed" is garble-residue vague |
| 1131 | oar | PASS | |
| 1132 | oasis | PASS | |
| 1133 | olive | PASS | |
| 1134 | ore | PASS | |
| 1135 | otter | PASS | |
| 1136 | pagoda | WARN | "a tall tower with many layers, from lands far away" — "from lands far away" is ethnocentric and geographically biased; should say "a type of tower found in East and Southeast Asia" or just omit origin |
| 1137 | parchment | PASS | |
| 1138 | parsley | PASS | |
| 1139 | pasture | PASS | |
| 1140 | pebble | PASS | |
| 1141 | pelican | PASS | |
| 1142 | pendant | PASS | |
| 1143 | pier | PASS | |
| 1144 | pigment | PASS | |
| 1145 | carefully | PASS | |
| 1146 | accept | PASS | |
| 1147 | quite | PASS | |
| 1148 | rise | PASS | |
| 1149 | although | PASS | |
| 1150 | unless | PASS | |
| 1151 | seldom | PASS | |
| 1152 | eventually | PASS | |

---

## Summary

- **Total:** 1152
- **PASS:** 1107
- **WARN:** 44
- **FAIL:** 1

---

## FAIL Details (must fix)

### #231 — bark
- **Definition:** "the tough outer covering of a tree"
- **Example:** "The bark of the old oak tree was rough and bumpy."
- **Issue:** This word appears in a sequence of sound/action words (whisper, shout, giggle, howl, **bark**, roar, hum, clap). The surrounding context strongly suggests the intended meaning is "the loud sound a dog makes." However, the definition and example describe tree bark instead. This is a **definition-context mismatch** — the word was likely meant to teach the dog-sound meaning at this level, and its placement among sound words confirms this. The definition must be changed to the dog-sound meaning, or a note must clarify that the tree-bark meaning is intentional despite the sound-word grouping.

---

## WARN Details (should fix)

### #13 — goose
"big bird" — geese are medium to large, but "big" overstates it. Consider "a large bird that honks."

### #18 — crow
"big black bird" — crows are medium-sized. Ravens are big. Change to "a black bird."

### #21 — dolphin
"friendly gray sea animal" — "friendly" is anthropomorphic and subjective. "pointed nose" — anatomically it's a beak/rostrum. Consider: "a gray sea animal with a rounded snout that jumps and plays in waves."

### #24 — lizard
"small animal like a snake but with four legs" — lizards are not snake-like. They are a distinct group of reptiles. Consider: "a small reptile with four legs and a long tail."

### #26 — toad
"small bumpy animal that hops" — toads primarily walk; frogs hop. Consider: "a small bumpy animal related to the frog, that lives mostly on land."

### #34 — ant
"tiny bug that lives in a group" — ants are insects, not true bugs. Minor for kids, but "tiny insect" is more accurate.

### #38 — skunk
"a black and white animal that smells bad" — skunks only smell bad when they spray. Consider: "a black and white animal that can spray a very bad smell."

### #48 — cracker
"thin dry food that crunches" — vague. Consider: "a thin, crispy, baked food."

### #53 — doughnut
"round sweet food with a hole" — not all doughnuts have holes. Consider: "a round, sweet, fried food, often with a hole."

### #56 — syrup
"a thick sweet stuff you pour on food" — "stuff" is too informal. Consider: "a thick, sweet liquid you pour on food."

### #63 — plum
"a small purple fruit" — plums come in many colors. Consider: "a small, soft fruit with smooth skin."

### #67 — coconut
"a big brown fruit" — technically a drupe; only brown when dehusked. Minor for kids.

### #68 — peanut
"a small food that grows in a shell in the ground" — vague. Consider: "a small nut-like seed that grows in a shell underground." (Noting peanut is a legume.)

### #73 — onion
"a round vegetable that makes you cry" — the crying is a side effect, not the core meaning. Consider: "a round vegetable with layers and a strong smell."

### #74 — mushroom
"a living thing with a cap on top and a stem" — mushrooms are fungi. Consider: "a type of fungus with a cap and stem that grows in damp places."

### #85 — thumb
"the short fat finger" — "fat" is not ideal language for kids. Use "thick" or "wide."

### #92 — eyelash
"tiny hairs on the edge of your eye" — should be "eyelid," not "eye."

### #97 — spine
"the bones down your back" — spine is a single column of vertebrae. Consider: "the column of bones down your back."

### #98 — rib
"bones around your chest that protect your body" — ribs protect the heart and lungs specifically, not "your body" generally.

### #101 — mitten
"a warm cover for your hand with no fingers" — mittens have a thumb section. Consider: "a warm cover for your hand with one space for your thumb and one for your fingers."

### #111 — lace
Only covers the shoelace meaning. For a vocab list, this is acceptable if intentional, but note that lace also means decorative fabric.

### #155 — castle
"where kings live" — present tense. Should be "where kings and queens lived long ago."

### #247 — remind
"to help someone recall" — "recall" is a harder word than "remind." Use "remember."

### #295 — sticky
"something that holds on to your fingers" — awkward/garbled. Consider: "feeling like something is clinging to you; hard to pull away from."

### #302 — boiling
"so hot with lots of bubbles" — incomplete fragment. Consider: "so hot that bubbles form and steam rises."

### #307 — shy
"afraid to talk to new people" — shy is broader (nervous/hesitant in social situations). Consider: "feeling nervous around people you don't know well."

### #517 — poem
"words that sound nice together" — oversimplified. Consider: "a piece of writing that uses rhythm or special words to share feelings or ideas."

### #538 — whisker
"long hair on a cat's face" — whiskers exist on many animals. Consider: "long stiff hairs on an animal's face, used for sensing things."

### #592 — itsy
"itsy" is not a standalone dictionary word; it only appears in "itsy-bitsy." Consider removing or marking as informal/compound.

### #641 — magnet
"something that pulls some metals" — magnets also repel. Consider: "something that can pull certain metals toward it or push another magnet away."

### #752 — camel
"bumps on its back" — the correct word is "humps." Change to "humps."

### #897 — north
"the way toward the top when you look at a flat picture of Earth" — awkward. Consider: "the direction toward the top of a map."

### #988 — amber
Definition only covers the color meaning; amber is primarily fossilized tree resin. Consider: "hard, golden-brown material formed from ancient tree sap."

### #996 — bagpipe
"a thing you blow into" — "a thing" is garble-residue vague. Consider: "a musical instrument with a bag and pipes that you blow into."

### #998 — banjo
"a round thing with strings that you pull" — "round thing" is garble-residue. Consider: "a musical instrument with a round body and strings you pluck."

### #1013 — bobsled
"a fast thing that slides" — garble-residue. Consider: "a small sled used to race down an icy track."

### #1036 — chariot
"a thing with two round parts" — garble-residue. Consider: "a two-wheeled vehicle pulled by horses, used long ago."

### #1046 — cork
"a soft light thing" — garble-residue. Consider: "a soft, lightweight material used to close bottles."

### #1069 — fiddle
"a thing with strings that you pull" — fiddles are played with a bow, not plucked. Consider: "a stringed instrument played with a bow, like a violin."

### #1071 — fjord
"between tall rocks" — undersells it. Consider: "a long, narrow inlet of the sea between steep cliffs."

### #1080 — gong
"a big flat round metal thing" — garble-residue. Consider: "a large, flat metal disk that makes a deep ringing sound when struck."

### #1088 — harp
"a big thing with many strings that you pull" — garble-residue. Consider: "a large musical instrument with many strings that you pluck."

### #1113 — lichen
"a flat, dry thing" — garble-residue. Consider: "a plant-like organism that grows on rocks and trees."

### #1116 — lynx
"tall, sharp ears" — lynx ears have tufts; they are pointed, not "sharp." Consider: "a wild cat with pointed, tufted ears."

### #1130 — nutmeg
"something from a seed" — garble-residue. Consider: "a spice made from a seed, used to flavor food."

### #1136 — pagoda
"from lands far away" — ethnocentric. Consider: "a tall tower with curved roofs on each level, found in East Asia."
