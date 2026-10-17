/*
 * AFTERWORD semantic lexicon â€” hand-curated, original data (no third-party dataset).
 *
 * Format, one entry per line:
 *   word | category.path [category.path ...] | relation relation ...
 *
 * Relations:
 *   =word     synonym / same thing          (strength 0.92)
 *   word:N    association of strength N/10  (N = 1..9)
 *   word      association of default strength 0.6
 *
 * Relations are symmetric: writing "ocean | ... | wave:8" also links wave -> ocean.
 * A word repeated on several lines is merged (categories and relations are combined).
 * Only words that have at least one category line are "known" to the game.
 *
 * Weight guide:  9 near-identical Â· 8 strongly tied Â· 7 clearly related
 *                6 related Â· 5 moderately Â· 4 loosely Â· 3 faintly
 */
(function (AW) {
  AW.LEXICON_SRC = String.raw`
# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ NATURE Â· WATER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
ocean | nature.water.sea | =sea water:8 wave:8 beach:7 tide:8 salt:6 deep:5 blue:5 island:6 shore:7 coast:6 ship:5 whale:6 shark:5 fish:5 reef:6 dolphin:5 sailor:4 swim:5 horizon:5 coral:5 seaweed:5 surf:5 bay:6 lagoon:5 sand:4 boat:5 anchor:4 storm:3 pirate:3
sea | nature.water.sea | water:8 wave:8 beach:7 tide:8 salt:6 shore:7 ship:6 fish:5 seagull:5 sailor:5 island:6 coast:7 bay:6 horizon:5
bay | nature.water.sea nature.land.coast | coast:7 harbor:7 lagoon:6 shore:6 boat:5
lagoon | nature.water.sea | bay:6 island:6 reef:6 water:6 coral:5 lake:5
wave | nature.water.sea | surf:8 tide:7 beach:7 foam:6 shore:7 splash:6 water:6 surfboard:6 storm:4 wind:4 ripple:7
tide | nature.water.sea | moon:6 shore:7 beach:6 wave:7 water:5
surf | nature.water.sea activity.sport | wave:8 surfboard:9 beach:7 surfing:9 foam:6
foam | nature.water.sea | wave:6 bubble:7 soap:5 surf:6
reef | nature.water.sea | coral:9 fish:6 diving:6 lagoon:6 shark:4
water | nature.water.fresh drink.cold | liquid:8 wet:8 drink:7 rain:7 river:7 lake:7 sea:7 ice:6 swim:6 splash:6 bottle:5 thirst:6 glass:4 wave:5 fish:4 bucket:4 juice:3 bath:5 puddle:6 pool:7
liquid | quality.other | water:8 juice:5 milk:5 pour:6
river | nature.water.fresh | stream:9 water:7 lake:6 bridge:6 bank:6 fish:5 flow:7 boat:5 valley:5 waterfall:7 canoe:6 delta:6 salmon:5 mountain:3 beaver:4
stream | nature.water.fresh | river:9 creek:9 flow:6 water:6 waterfall:5
creek | nature.water.fresh | stream:9 river:8
lake | nature.water.fresh | pond:8 water:7 river:6 swim:5 fish:5 boat:5 canoe:5 shore:5 lagoon:5 ice:3
pond | nature.water.fresh | lake:8 frog:6 duck:6 water:6 puddle:5 lily:5 fish:4
puddle | nature.water.fresh | rain:7 mud:6 splash:7 water:6 pond:5 boot:4
waterfall | nature.water.fresh | river:7 cliff:5 stream:5 splash:5 mist:4 water:6
spring | nature.water.fresh time.season | summer:5 autumn:5 winter:5 flower:6 blossom:7 bloom:7 water:4 season:7 april:7 coil:5 bounce:5 green:4 tulip:5
pool | place.outdoor nature.water.fresh | swim:8 water:7 diving:6 splash:6
ice | nature.water.ice weather.temp | cold:8 frozen:9 snow:7 frost:7 freeze:9 glacier:7 iceberg:8 winter:6 water:6 skate:6 slippery:6 cube:5 crystal:4 igloo:5 penguin:4 polar:6
glacier | nature.water.ice | ice:7 iceberg:7 mountain:5 cold:6 snow:5 polar:5 frozen:6
iceberg | nature.water.ice | ice:8 glacier:7 ship:4 polar:6 ocean:4 cold:6 penguin:4
frozen | quality.temp | ice:9 cold:7 freeze:9 frost:7 winter:6 snow:6
splash | action.move | water:6 wave:6 puddle:7 swim:5
bubble | quality.other | foam:7 soap:7 water:4 balloon:4 bath:5

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ NATURE Â· LAND â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
beach | nature.land.coast place.outdoor | sand:9 shore:9 coast:8 ocean:7 sea:7 wave:7 sunbathe:7 surf:7 shell:7 palm:6 summer:6 sun:5 holiday:6 vacation:6 towel:6 sandcastle:8 island:6 seagull:5 swim:5 tide:6 umbrella:4 bikini:6 sunscreen:6 crab:5 dune:6 surfboard:6 pier:5 hut:4 coconut:4 starfish:5
shore | nature.land.coast | =coast beach:9 sea:7 ocean:7 wave:7 tide:7 lake:5 sand:6
coast | nature.land.coast | shore:9 beach:8 sea:7 ocean:6 cliff:6 lighthouse:6 harbor:6 bay:7
island | nature.land.coast | ocean:6 sea:6 beach:6 palm:6 lagoon:6 tropical:7 volcano:5 pirate:5 treasure:5 shipwreck:5 boat:4 coconut:5 isolated:5 sand:4 coast:5
dune | nature.land.coast nature.land.habitat | sand:9 desert:8 beach:6 wind:4
cliff | nature.land.relief nature.land.coast | rock:7 edge:7 mountain:6 coast:6 fall:5 climb:5 canyon:5 waterfall:5
mountain | nature.land.relief | hill:8 peak:9 summit:9 climb:7 valley:6 snow:5 rock:6 cliff:6 volcano:6 high:6 tall:5 glacier:5 cave:4 forest:4 ski:5 goat:4 eagle:3 river:3
hill | nature.land.relief | mountain:8 slope:7 valley:6 climb:5 grass:4 high:4
peak | nature.land.relief | summit:9 mountain:9 top:7 high:6
summit | nature.land.relief | peak:9 mountain:9 top:7
valley | nature.land.relief | hill:6 mountain:6 river:5 canyon:6 meadow:4
canyon | nature.land.relief | valley:6 cliff:5 desert:5 river:4 rock:5
cave | nature.land.relief | rock:6 dark:6 bat:7 cliff:4 mountain:4 underground:7 treasure:4 echo:5 tunnel:6 bear:4 crystal:3
volcano | nature.land.relief | lava:9 eruption:9 mountain:6 fire:6 ash:7 magma:9 erupt:9 smoke:5 crater:7 hot:5 island:5 earthquake:5 rock:5 heat:4 explode:5
lava | nature.fire | volcano:9 magma:9 hot:6 fire:6 rock:5 burn:5 molten:8 heat:5 eruption:7 red:4
magma | nature.fire | lava:9 volcano:9 molten:7
crater | nature.land.relief | volcano:7 moon:6 meteor:6 hole:6
earthquake | weather.storm nature.land.relief | shake:8 volcano:5 disaster:6 ground:5
desert | nature.land.habitat | sand:8 dune:8 cactus:8 camel:8 dry:8 hot:7 heat:6 sun:5 oasis:8 sahara:9 scorpion:5 drought:6 thirst:5 lizard:4 canyon:5
oasis | nature.land.habitat | desert:8 water:5 palm:5 camel:5
forest | nature.land.habitat | =woods tree:8 jungle:7 wood:6 leaf:6 deer:5 bear:5 wolf:5 owl:5 mushroom:5 pine:6 oak:5 green:4 moss:5 fox:4 hike:4 camping:4 branch:4 squirrel:4
woods | nature.land.habitat | forest:9 tree:7
jungle | nature.land.habitat | rainforest:9 forest:7 tropical:7 vine:6 monkey:7 tiger:5 parrot:6 snake:4 green:4 gorilla:5 humid:5
rainforest | nature.land.habitat | jungle:9 tropical:6 rain:5
swamp | nature.land.habitat | marsh:9 mud:6 frog:6 crocodile:6 wet:5
marsh | nature.land.habitat | swamp:9 mud:5 reed:5
meadow | nature.land.habitat | field:8 grass:7 flower:6 daisy:5 butterfly:4 green:4 bee:3
field | nature.land.habitat | meadow:8 grass:6 farm:6 crop:6 wheat:5 tractor:4
ground | nature.land.ground | earth:7 soil:7 floor:6 dirt:6
earth | nature.land.ground sky.body | world:8 planet:7 ground:7 soil:6 globe:6
world | sky.body | earth:8 planet:6 globe:7 map:4
soil | nature.land.ground | dirt:9 earth:6 mud:6 ground:7 seed:5 plant:5 root:5 garden:5 worm:5
dirt | nature.land.ground | soil:9 mud:7 dust:6 ground:6
mud | nature.land.ground | dirt:7 wet:6 puddle:6 swamp:6 pig:5 clay:5 soil:6
clay | nature.land.ground material.other | mud:5 pottery:8 brick:6
dust | nature.land.ground | dirt:6 sand:5 broom:5
sand | nature.land.ground | beach:9 desert:8 dune:9 grain:6 sandcastle:8 shore:6 pebble:5 hourglass:6 glass:4 dust:5 shell:4 tan:3 bucket:4
pebble | nature.land.ground | stone:8 rock:7 sand:5 beach:4
rock | nature.land.ground material.other | =stone boulder:9 pebble:7 mountain:6 cliff:7 hard:6 cave:5 crystal:4 lava:4
stone | nature.land.ground material.other | rock:9 pebble:8 boulder:8 wall:4 castle:3 hard:5
boulder | nature.land.ground | rock:9 stone:8
crystal | nature.land.ground material.gem | diamond:6 gem:7 quartz:8 glass:5 ice:4 cave:3 shiny:5
shell | nature.sea_find animal.sea.other | seashell:9 beach:7 clam:6 oyster:6 snail:5 turtle:5 sand:4 crab:5 pearl:5 ocean:4 hermit:4

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ NATURE Â· PLANTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
tree | nature.plant.tree | leaf:8 branch:8 trunk:8 root:7 forest:8 wood:7 oak:8 pine:7 bark:7 palm:6 shade:5 nest:5 apple:4 seed:5 climb:4 green:4 grow:5 plant:6
plant | nature.plant.other | tree:6 flower:7 leaf:6 seed:7 grow:8 garden:7 root:6 pot:4 green:5 soil:5 water:3
palm | nature.plant.tree body.part | coconut:8 beach:6 tropical:7 island:6 frond:9 tree:6 hand:7 finger:5 oasis:5 date:4
oak | nature.plant.tree | tree:8 acorn:9 wood:6 forest:5 leaf:4
pine | nature.plant.tree | tree:7 forest:6 cone:7 needle:6 christmas:6 evergreen:8
willow | nature.plant.tree | tree:7 river:4 weeping:6
maple | nature.plant.tree | tree:7 syrup:8 leaf:6 autumn:5
bamboo | nature.plant.tree nature.plant.other | panda:8 grass:5 stick:4 forest:4
leaf | nature.plant.part | tree:8 green:6 branch:7 autumn:7 plant:6 frond:7 petal:4 rake:4 fall:4
branch | nature.plant.part | tree:8 twig:9 leaf:7 stick:6 bird:3 nest:4
twig | nature.plant.part | branch:9 stick:8 nest:5
stick | nature.plant.part object.toy | twig:8 branch:6 wood:6 dog:3
root | nature.plant.part | tree:7 soil:5 plant:6 carrot:4 ground:4 underground:4
trunk | nature.plant.part object.container | tree:8 bark:6 elephant:5 chest:5 wood:5
bark | nature.plant.part action.daily | tree:7 trunk:6 wood:5 dog:7 woof:7 howl:5
seed | nature.plant.part | plant:7 grow:7 sprout:8 soil:5 flower:5 tree:5 garden:5 fruit:4 apple:3 nut:4 bird:3 sunflower:4 acorn:6 bean:4 farm:3
sprout | nature.plant.part | seed:8 grow:7 spring:4
acorn | nature.plant.part | oak:9 squirrel:7 nut:7 seed:6
nut | food.snack | acorn:7 squirrel:6 peanut:8 coconut:5 seed:4
frond | nature.plant.part | palm:9 leaf:7 fern:6
petal | nature.plant.part | flower:8 rose:6 bloom:5 leaf:4
thorn | nature.plant.part | rose:7 cactus:6 sharp:6 prick:6
stem | nature.plant.part | flower:6 leaf:5 plant:5 root:4
flower | nature.plant.flower | bloom:8 blossom:8 rose:8 petal:8 tulip:7 daisy:7 garden:7 bee:6 bouquet:8 plant:7 spring:6 lily:6 pollen:6 sunflower:7 vase:6 seed:5 meadow:5 butterfly:4 orchid:6 smell:4
bloom | nature.plant.flower | blossom:9 flower:8 spring:6
blossom | nature.plant.flower | bloom:9 flower:8 spring:7 cherry:6 petal:6
rose | nature.plant.flower color.red | flower:8 thorn:7 petal:7 red:7 love:6 bouquet:6 valentine:6 garden:5 pink:4 romance:5 tulip:4
tulip | nature.plant.flower | flower:7 bulb:5 spring:5 rose:4 holland:5
daisy | nature.plant.flower | flower:7 meadow:5 white:3 petal:4
lily | nature.plant.flower | flower:6 pond:5 white:3
orchid | nature.plant.flower | flower:6 tropical:4
sunflower | nature.plant.flower | flower:7 sun:6 seed:5 yellow:5 tall:3
bouquet | object.decoration | flower:8 rose:6 wedding:5 vase:5
vase | object.decoration | flower:6 bouquet:5 pottery:4
pollen | nature.plant.part | bee:7 flower:6 honey:4 allergy:5
grass | nature.plant.other | lawn:9 green:7 meadow:7 field:6 mow:7 weed:5 hay:5 garden:4 cow:3 bamboo:3 dew:4
lawn | nature.plant.other place.outdoor | grass:9 mow:7 garden:6
hay | nature.plant.other | straw:8 barn:6 horse:5 farm:5 grass:5
straw | nature.plant.other | hay:8 barn:4 drink:3 scarecrow:5
weed | nature.plant.other | grass:5 garden:4
moss | nature.plant.other | forest:5 green:5 rock:4 fern:4
fern | nature.plant.other | moss:4 forest:4 frond:6 leaf:4
vine | nature.plant.other | jungle:6 grape:6 ivy:7 climb:4
ivy | nature.plant.other | vine:7 wall:4
cactus | nature.plant.other | desert:8 thorn:6 prickly:7 dry:5 succulent:7 spike:5
seaweed | nature.plant.other | ocean:5 kelp:9 algae:7 sea:6 beach:4 sushi:4
kelp | nature.plant.other | seaweed:9 ocean:5 otter:4
algae | nature.plant.other | seaweed:7 pond:4 green:3
mushroom | nature.plant.other food.vegetable | fungus:9 toadstool:9 forest:5 spore:6 soup:3 pizza:3 moss:3 truffle:7 mold:5 damp:4
fungus | nature.plant.other | mushroom:9 mold:6 spore:6
toadstool | nature.plant.other | mushroom:9 fairy:4

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SKY Â· SPACE Â· TIME â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
sky | sky.space weather.air | cloud:8 blue:7 heaven:6 sun:6 bird:4 star:5 air:6 horizon:6 kite:4 fly:4
air | weather.air | wind:6 breathe:7 sky:6 oxygen:7 breeze:5
horizon | sky.space | sky:6 sunset:6 sea:5 ocean:5 sunrise:5 distance:6 edge:4
sun | sky.body | sunshine:9 sunlight:9 sunny:8 star:6 sunset:7 sunrise:7 summer:7 hot:6 heat:6 light:6 day:6 bright:6 solar:9 moon:5 sky:6 yellow:5 tan:5 beach:4 sunflower:4 noon:4 shadow:4 burn:4 warm:5 planet:4
sunshine | weather.air | sun:9 sunny:9 sunlight:9 bright:6 summer:6 warm:5
sunlight | weather.air | sun:9 sunshine:9 light:7 bright:6
sunny | weather.air | sun:8 sunshine:9 bright:6 summer:5 warm:5
solar | sky.space | sun:9 panel:5 energy:6
moon | sky.body | lunar:9 crescent:8 night:7 tide:6 star:6 crater:6 orbit:6 astronaut:6 sky:5 sun:5 planet:5 eclipse:6 werewolf:5 wolf:3 full:5 rocket:4 owl:3 dark:4 midnight:5
lunar | sky.space | moon:9 crescent:5
crescent | sky.space | moon:8 shape:4 lunar:5
star | sky.body person.job | twinkle:7 constellation:8 galaxy:7 sun:6 moon:6 night:6 sky:5 planet:6 shine:6 wish:5 telescope:6 shooting:4 comet:5 bright:4 famous:5 celebrity:7 astronomer:5
constellation | sky.space | star:8 galaxy:5 astronomer:5
planet | sky.body | earth:7 mars:8 jupiter:8 saturn:8 orbit:7 star:6 moon:5 galaxy:6 universe:6 telescope:5 space:7 solar:5 alien:4 comet:4 astronaut:5 sun:4 rocket:4
mars | sky.body | planet:8 red:4 rocket:4 alien:4
jupiter | sky.body | planet:8 saturn:6
saturn | sky.body | planet:8 ring:6 jupiter:6
comet | sky.body | meteor:8 asteroid:7 tail:6 star:5 space:6 planet:4 telescope:5 orbit:5 shooting:5
meteor | sky.body | comet:8 asteroid:8 meteorite:9 crater:6 shooting:6 space:5 star:4
meteorite | sky.body | meteor:9 crater:6 rock:4
asteroid | sky.body | meteor:8 comet:7 space:5 crater:5
galaxy | sky.space | universe:8 star:7 milky:6 space:7 planet:6 cosmos:9 constellation:5
universe | sky.space | galaxy:8 cosmos:9 space:8 planet:6 star:5
cosmos | sky.space | universe:9 galaxy:8 space:8
space | sky.space | universe:8 galaxy:7 planet:7 astronaut:8 rocket:7 orbit:6 star:5 alien:5 cosmos:8 moon:4 satellite:6
orbit | sky.space | planet:7 moon:6 satellite:7 space:6 gravity:6
gravity | sky.space | orbit:6 fall:5 weight:5 apple:3
eclipse | sky.space | sun:6 moon:7 shadow:6 dark:4
astronaut | person.job | space:8 rocket:8 moon:6 helmet:5 orbit:5 planet:5 alien:3 pilot:4
alien | person.fantasy | space:5 planet:4 ufo:9 mars:4
ufo | object.vehicle_misc vehicle.air | alien:9 space:5
telescope | object.nav | star:6 astronomer:8 lens:7 planet:5 binoculars:7 moon:5 galaxy:5 comet:5 observatory:9 sky:4 microscope:6 zoom:5 pirate:3
astronomer | person.job | telescope:8 star:5 planet:5 observatory:7
observatory | place.building.public | telescope:9 astronomer:7 star:4
binoculars | object.nav | telescope:7 lens:6 bird:3 zoom:5
microscope | object.tech | telescope:6 lens:7 science:6 germ:6
lens | object.tech | glasses:6 camera:6 telescope:7 microscope:7
day | time.day | night:6 morning:6 sun:6 light:5 noon:6 week:5 daylight:9 today:7
daylight | time.day | day:9 sunlight:7
today | time.day | day:7 tomorrow:7 yesterday:7
tomorrow | time.day | today:7 future:6 yesterday:5
yesterday | time.day | today:7 past:6 memory:4
night | time.day | dark:8 midnight:8 moon:7 star:6 sleep:6 evening:6 day:6 owl:5 bat:4 dream:5 bedtime:7 nocturnal:7 darkness:7 twilight:5 lantern:3
midnight | time.day | night:8 dark:6 clock:4 twelve:5 moon:4
evening | time.day | dusk:8 night:6 sunset:7 twilight:7 dinner:4
dusk | time.day | twilight:9 evening:8 sunset:8 dark:5 dawn:5 night:5
twilight | time.day | dusk:9 evening:7 sunset:7 dawn:6 night:5
dawn | time.day | sunrise:9 morning:8 daybreak:9 dusk:5 twilight:6 rooster:5
daybreak | time.day | dawn:9 sunrise:8
sunrise | time.day | dawn:9 morning:8 sun:7 sunset:7 east:5 daybreak:8 horizon:5
sunset | time.day | dusk:8 evening:7 sun:7 sunrise:7 twilight:7 horizon:6 orange:5 west:5 beach:4 dark:3 golden:4
morning | time.day | dawn:8 sunrise:8 breakfast:6 coffee:5 day:6 wake:6 alarm:5 rooster:4
noon | time.day | midday:9 lunch:5 day:6 sun:4 clock:3
midday | time.day | noon:9 lunch:5
summer | time.season | hot:7 sun:7 holiday:6 beach:6 vacation:6 heat:6 warm:6 winter:6 spring:5 autumn:5 july:7 august:7 swim:4 sunny:5 ice:2 icecream:5 picnic:4 barbecue:4 season:7
winter | time.season | snow:8 cold:8 ice:6 frost:7 christmas:6 summer:6 autumn:6 spring:5 freezing:6 december:7 january:7 sled:6 scarf:5 snowman:7 coat:4 season:7 fireplace:4 blizzard:5
autumn | time.season | =fall leaf:7 harvest:7 pumpkin:6 october:7 september:6 november:6 winter:6 summer:5 spring:5 season:7 maple:4 orange:3 halloween:5 rake:4
fall | time.season action.move | autumn:9 drop:8 trip:5 slip:6 gravity:5 leaf:5 cliff:4
season | time.season | summer:7 winter:7 autumn:7 spring:7 weather:4 year:5
week | time.unit | day:5 month:7 weekend:7
weekend | time.unit | week:7 saturday:7 sunday:7 holiday:4
month | time.unit | year:7 week:7 calendar:6 december:5
year | time.unit | month:7 calendar:6 birthday:5 century:6 season:5
century | time.unit | year:6 history:5
hour | time.unit | minute:8 clock:7 time:6
minute | time.unit | hour:8 second:7 clock:6 time:6
second | time.unit | minute:7 clock:5
time | time.unit | clock:8 hour:6 watch:6 minute:6 calendar:5 past:5 future:5 hourglass:6
calendar | object.paper | date:7 month:6 year:6 day:4 time:5
date | time.unit food.fruit | calendar:7 day:5 palm:4 romance:4
december | time.unit | winter:7 christmas:7 month:5
january | time.unit | winter:6 month:5 year:4
july | time.unit | summer:7 month:5
august | time.unit | summer:7 month:5
october | time.unit | autumn:7 halloween:7 month:5
september | time.unit | autumn:6 school:5 month:5
november | time.unit | autumn:6 month:5
april | time.unit | spring:7 rain:4 month:5
past | time.unit | history:7 memory:6 yesterday:6 future:5
future | time.unit | tomorrow:6 past:5 robot:3
history | activity.study | past:7 museum:6 ancient:7 century:5 castle:3 story:4
ancient | quality.other | old:7 history:7 ruins:7 temple:5 pyramid:6
pyramid | place.building.grand | egypt:8 desert:5 ancient:6 tomb:7 pharaoh:9 mummy:7 triangle:5
mummy | person.fantasy | pyramid:7 tomb:7 egypt:6 mother:5
tomb | place.building.grand | pyramid:7 grave:8 mummy:6
ruins | place.building.grand | ancient:7 castle:4 temple:4

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ WEATHER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
weather | weather.air | rain:6 sun:5 storm:6 forecast:8 climate:7 wind:5 cloud:5 snow:5 temperature:6 season:4
forecast | weather.air | weather:8 rain:4
climate | weather.air | weather:7 temperature:5
temperature | weather.temp | hot:6 cold:6 thermometer:8 heat:6 weather:6 fever:5
thermometer | object.tech | temperature:8 fever:6 hot:4 cold:4
rain | weather.precip | drizzle:9 shower:8 umbrella:8 cloud:7 wet:7 storm:7 water:7 puddle:7 drop:6 thunder:6 raincoat:8 rainbow:6 flood:6 drought:5 drip:5 snow:5 monsoon:7 weather:6 grey:3 boot:3 april:3
drizzle | weather.precip | rain:9 mist:5 drip:5
shower | weather.precip place.room | rain:8 bath:7 wash:6 water:5 soap:5 bathroom:7
snow | weather.precip | snowflake:9 winter:8 cold:7 ice:7 snowman:9 blizzard:8 frost:6 white:5 sled:7 ski:7 freezing:6 rain:5 mountain:4 christmas:4 igloo:5 hail:5 sleet:7 avalanche:6 scarf:3 polar:5
snowflake | weather.precip | snow:9 winter:6 ice:5 cold:5 crystal:5
snowman | object.toy | snow:9 winter:7 carrot:5 scarf:4 cold:4
sleet | weather.precip | snow:7 rain:6 hail:7 ice:5
hail | weather.precip | ice:6 storm:6 sleet:7 snow:5
blizzard | weather.storm | snow:8 storm:7 winter:6 cold:6 wind:5
avalanche | weather.storm | snow:6 mountain:6 ski:4
frost | weather.temp | ice:7 cold:7 frozen:7 winter:7 freezing:8 snow:6 chill:6 dew:5 morning:3
dew | weather.precip | morning:5 grass:4 drop:5 frost:5
cold | weather.temp quality.temp | freezing:8 chilly:8 cool:6 frozen:7 ice:8 winter:8 snow:7 frost:7 shiver:8 hot:6 warm:5 polar:6 scarf:4 coat:4 fever:3 sneeze:4 temperature:6
chill | weather.temp | cold:7 chilly:8 frost:6 cool:6 shiver:6 relax:4
chilly | weather.temp | cold:8 chill:8 cool:7
cool | quality.temp | cold:6 chilly:7 breeze:5 fresh:5 warm:4 calm:3 shade:4
freezing | quality.temp | cold:8 frozen:8 ice:7 frost:8 winter:6 snow:6 shiver:7
shiver | action.daily | cold:8 freezing:7 tremble:8 shake:6 fear:4
storm | weather.storm | thunder:8 lightning:8 rain:7 wind:7 hurricane:8 tempest:9 tornado:6 cloud:6 wave:4 blizzard:7 weather:6 dark:4 flood:5 hail:6 calm:4 shipwreck:4
tempest | weather.storm | storm:9 hurricane:6
thunder | weather.storm | lightning:9 storm:8 rumble:8 loud:6 cloud:6 rain:6 bolt:6 boom:7 noise:4 drum:3
lightning | weather.storm | thunder:9 storm:8 bolt:8 flash:7 electric:7 electricity:7 cloud:5 rain:5 strike:5 bright:4 spark:4
bolt | weather.storm object.tool | lightning:8 thunder:6 screw:6 nut:4
flash | quality.other | lightning:7 camera:6 bright:6 light:5 quick:5
hurricane | weather.storm | storm:8 cyclone:9 typhoon:9 tornado:7 wind:8 rain:5 flood:5 ocean:3
cyclone | weather.storm | hurricane:9 typhoon:9 tornado:6 storm:7
typhoon | weather.storm | hurricane:9 cyclone:9 storm:7
tornado | weather.storm | twister:9 hurricane:7 wind:8 storm:6 spin:6 cyclone:6
twister | weather.storm | tornado:9 spin:5
monsoon | weather.precip | rain:7 flood:6 storm:5
flood | weather.storm | water:6 rain:6 storm:5 wet:5 drought:5 river:5
drought | weather.temp | dry:8 desert:6 heat:6 thirst:5 rain:5 flood:5
wind | weather.air | breeze:8 gust:9 blow:8 storm:7 air:6 kite:6 windmill:7 sail:6 tornado:7 hurricane:7 cold:4 cloud:4 wave:4 leaf:3 whistle:4
breeze | weather.air | wind:8 cool:5 gentle:5 air:5 fresh:5
gust | weather.air | wind:9 breeze:6 blow:7
blow | action.move | wind:8 gust:7 breath:6 candle:4 balloon:4
cloud | weather.air | sky:8 rain:7 fog:6 storm:6 grey:5 fluffy:7 white:5 thunder:6 mist:5 weather:5 cotton:4 shade:4
fog | weather.air | mist:9 haze:8 cloud:6 smog:7 grey:5 damp:5 lighthouse:4 murky:5
mist | weather.air | fog:9 haze:7 dew:5 cloud:5 drizzle:5 spray:6 damp:5 waterfall:4
haze | weather.air | fog:8 mist:7 smog:6 smoke:4
smog | weather.air | fog:7 pollution:8 smoke:6 haze:6
rainbow | weather.precip | color:7 rain:6 sun:5 arch:6 prism:7 sky:5 unicorn:5 red:4 violet:4 gold:4
umbrella | object.clothing.wear | rain:8 parasol:9 raincoat:7 wet:5 shade:5 beach:4 storm:4 drizzle:5 cane:3 handle:4 open:3
parasol | object.clothing.wear | umbrella:9 shade:6 sun:4 beach:5
raincoat | object.clothing.wear | rain:8 umbrella:7 coat:7 boot:5 wet:5
shade | quality.other | shadow:7 umbrella:5 tree:5 cool:4 dark:4
shadow | quality.other | shade:7 dark:6 light:5 silhouette:7 sun:4 ghost:3
silhouette | quality.other | shadow:7 outline:6 dark:4

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ FIRE Â· HEAT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
fire | nature.fire | flame:9 blaze:9 burn:8 heat:7 smoke:8 campfire:8 bonfire:8 ash:7 hot:7 fireplace:7 ember:7 spark:7 candle:5 firefighter:6 wood:5 match:6 lava:5 volcano:5 warm:5 torch:6 dragon:4 red:4 orange:3 light:4 cook:3
flame | nature.fire | fire:9 blaze:8 candle:7 burn:7 torch:6 spark:6 heat:5 ember:5 hot:5 match:5 lantern:4
blaze | nature.fire | fire:9 flame:8 inferno:9 burn:6
inferno | nature.fire | blaze:9 fire:8 hell:6
campfire | nature.fire activity.leisure | bonfire:9 fire:8 camping:8 marshmallow:8 flame:6 log:6 tent:6 smoke:5 ember:6 story:4 night:3 guitar:3 beach:3 warm:4
bonfire | nature.fire | campfire:9 fire:8 flame:6 night:4 beach:4
ember | nature.fire | spark:7 ash:7 fire:7 glow:7 coal:7 flame:5 campfire:6
spark | nature.fire | ember:7 fire:7 flash:6 lightning:5 flame:6 match:5 electric:5
ash | nature.fire nature.plant.tree | smoke:7 fire:7 ember:7 volcano:7 dust:5 burn:6 grey:4 cigarette:5
smoke | nature.fire | fire:8 ash:7 chimney:8 smog:6 steam:6 cigarette:6 burn:6 fog:4 grey:4 cloud:4 alarm:4
steam | nature.fire | vapor:9 smoke:6 boil:7 kettle:6 hot:5 mist:5 train:4 sauna:6
burn | action.make | fire:8 flame:7 hot:6 scorch:8 ash:6 heat:6 sunburn:7 smoke:6 blaze:6 candle:4
heat | weather.temp | hot:9 warm:7 fire:7 sun:6 summer:6 temperature:6 sweat:6 burn:6 heatwave:9 desert:5 oven:5
heatwave | weather.temp | heat:9 hot:7 summer:6
hot | quality.temp weather.temp | heat:9 warm:8 burning:8 boiling:8 sweat:6 fire:7 summer:7 sun:6 spicy:6 cold:6 desert:5 lava:5 oven:4 tropical:4 sauna:5
warm | quality.temp | hot:8 heat:7 cozy:7 sun:5 summer:6 cool:4 cold:5 blanket:5 fire:5
burning | quality.temp | hot:8 fire:7 burn:8 blaze:6
boiling | quality.temp | hot:8 boil:9 kettle:5 steam:6
boil | action.make | boiling:9 steam:7 kettle:6 pot:5 water:4 cook:5
cozy | quality.other | warm:7 blanket:6 fireplace:6 comfortable:7 home:4
sweat | body.inner | heat:6 hot:6 run:3 sauna:5
sauna | place.room | steam:6 heat:5 hot:5 sweat:5
fireplace | object.home | chimney:8 fire:7 hearth:9 log:6 cozy:6 warm:5 winter:4
hearth | object.home | fireplace:9 home:5 fire:6
chimney | object.home | smoke:8 fireplace:8 roof:6 santa:5 brick:4 house:3
log | nature.plant.part | wood:8 fireplace:6 campfire:6 firewood:9 cabin:5 tree:5
firewood | nature.plant.part | log:9 wood:8 campfire:5
coal | material.other | ember:7 mine:6 fire:5 black:4 diamond:3
torch | object.light | flashlight:8 flame:6 fire:6 light:5 lantern:6
match | object.light activity.sport | fire:6 spark:5 flame:5 candle:4 game:4 lighter:7
lighter | object.light | match:7 fire:5 flame:5
glow | quality.other | shine:7 light:6 ember:7 bright:5 lantern:4 firefly:5
dragon | person.fantasy animal.myth | fire:4 knight:6 castle:5 wing:4 lizard:4 treasure:5 myth:6 scale:3 unicorn:5

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ANIMALS Â· MAMMALS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
animal | animal | creature:8 pet:6 zoo:6 wild:5 beast:7
creature | animal | animal:8 beast:7 monster:5
pet | animal | dog:7 cat:7 hamster:6 goldfish:5 rabbit:4 puppy:5 kitten:5 animal:6 parrot:3
zoo | place.outdoor | animal:6 lion:4 elephant:4 cage:6 monkey:4 giraffe:4 zebra:4
dog | animal.mammal.canine | puppy:9 hound:9 canine:9 bark:7 wolf:7 pet:7 bone:6 leash:7 fetch:7 cat:6 woof:7 collar:6 fox:5 tail:5 kennel:7 walk:4 loyal:5 paw:5
puppy | animal.mammal.canine | dog:9 kitten:6 hound:6 cute:5
hound | animal.mammal.canine | dog:9 hunt:5
canine | animal.mammal.canine | dog:9 wolf:7 tooth:4
wolf | animal.mammal.canine | dog:7 pack:7 howl:8 fox:6 moon:4 forest:5 werewolf:8 coyote:8 sheep:4 bear:4 predator:6
coyote | animal.mammal.canine | wolf:8 fox:5 desert:4 howl:5
werewolf | person.fantasy | wolf:8 moon:6 vampire:6 monster:6
howl | action.daily | wolf:8 dog:5 moon:3
fox | animal.mammal.canine | wolf:6 dog:5 clever:6 sly:7 tail:5 forest:4 rabbit:4 chicken:4
cat | animal.mammal.feline | kitten:9 feline:9 meow:8 purr:8 dog:6 pet:7 mouse:6 whisker:7 tiger:6 lion:5 paw:5 tail:4
kitten | animal.mammal.feline | cat:9 puppy:6 cute:5 meow:6
feline | animal.mammal.feline | cat:9 lion:6 tiger:6
meow | action.daily | cat:8 kitten:6
purr | action.daily | cat:8
lion | animal.mammal.feline | tiger:8 roar:8 mane:8 king:6 pride:6 cat:5 safari:6 savanna:7 leopard:6 jungle:4 zebra:4 cub:5 predator:6 zoo:4
tiger | animal.mammal.feline | lion:8 stripes:8 jungle:6 leopard:7 cat:6 roar:6 cheetah:6 predator:6 zebra:4 cub:4 orange:3 india:4
leopard | animal.mammal.feline | cheetah:8 tiger:7 lion:6 spots:7 jaguar:8 panther:8
cheetah | animal.mammal.feline | leopard:8 fast:7 speed:7 tiger:6 savanna:5
jaguar | animal.mammal.feline | leopard:8 panther:7 jungle:5
panther | animal.mammal.feline | jaguar:7 leopard:8 black:4
roar | action.daily | lion:8 tiger:6 loud:5 bear:4 dinosaur:4
cub | animal.mammal.wild | lion:5 bear:6 tiger:4 baby:4
savanna | nature.land.habitat | lion:7 zebra:6 giraffe:6 safari:7 elephant:5 grass:4 africa:6
safari | activity.leisure | lion:6 savanna:7 elephant:5 zebra:5 jeep:4 africa:6
horse | animal.mammal.farm | pony:9 stallion:9 mare:9 saddle:8 gallop:8 ride:7 hoof:7 donkey:7 zebra:7 farm:5 cowboy:6 carriage:6 knight:4 hay:5 race:4 unicorn:5 cow:4 mane:6
pony | animal.mammal.farm | horse:9 donkey:5 ride:5 saddle:5
donkey | animal.mammal.farm | horse:7 mule:9 pony:5 farm:4
mule | animal.mammal.farm | donkey:9 horse:6
saddle | object.tool | horse:8 ride:6 cowboy:5 pony:5
cowboy | person.job | horse:6 ranch:7 hat:5 saddle:5 boot:4
ranch | place.building.farm | cowboy:7 farm:7 horse:5 cattle:6
unicorn | animal.myth person.fantasy | horse:5 rainbow:5 dragon:5 magic:6 horn:6 myth:6
cow | animal.mammal.farm | cattle:9 bull:8 calf:8 milk:8 moo:8 farm:7 barn:6 beef:6 sheep:5 pig:5 goat:5 grass:4 horse:4 udder:6 cheese:3 herd:5
cattle | animal.mammal.farm | cow:9 bull:7 herd:7 ranch:6 beef:5
bull | animal.mammal.farm | cow:8 cattle:7 horn:7 ox:8
ox | animal.mammal.farm | bull:8 cow:6 cart:5
calf | animal.mammal.farm | cow:8 baby:4 bull:5
moo | action.daily | cow:8
pig | animal.mammal.farm | hog:9 piglet:9 pork:7 bacon:6 farm:7 mud:5 oink:8 sheep:4 cow:5 goat:4 pink:3
hog | animal.mammal.farm | pig:9 pork:5
piglet | animal.mammal.farm | pig:9
oink | action.daily | pig:8
sheep | animal.mammal.farm | lamb:9 ewe:9 wool:9 flock:7 shepherd:8 goat:7 farm:6 cow:5 pig:4 wolf:4 shear:6 baa:8
lamb | animal.mammal.farm | sheep:9 wool:6 baby:3 ewe:6
ewe | animal.mammal.farm | sheep:9 lamb:6
goat | animal.mammal.farm | sheep:7 kid:5 cheese:4 horn:5 mountain:4 farm:5 cow:5
shepherd | person.job | sheep:8 flock:6 farmer:5
flock | animal.bird.other | sheep:7 bird:6 herd:6
herd | animal.mammal.farm | cattle:7 cow:5 flock:6 elephant:4
bear | animal.mammal.wild | grizzly:9 polar:6 cub:6 honey:6 panda:6 forest:5 cave:4 claw:5 hibernate:7 salmon:4 wolf:4 teddy:5 roar:4
grizzly | animal.mammal.wild | bear:9
panda | animal.mammal.wild | bear:6 bamboo:8 china:5 black:3
koala | animal.mammal.wild | eucalyptus:8 kangaroo:6 bear:4 australia:6
kangaroo | animal.mammal.wild | australia:8 pouch:8 koala:6 jump:6 hop:6
polar | quality.temp | ice:6 arctic:9 cold:6 penguin:5 bear:6 snow:5 iceberg:6 glacier:5
arctic | nature.land.habitat | polar:9 ice:6 snow:5 cold:6 penguin:4 iceberg:5
elephant | animal.mammal.wild | trunk:8 tusk:8 ivory:7 mammoth:8 rhino:6 hippo:6 giraffe:5 africa:5 savanna:5 big:5 huge:5 zoo:4 herd:4 peanut:4 grey:3 memory:3 circus:4
mammoth | animal.mammal.wild | elephant:8 ice:3 tusk:6 dinosaur:4
tusk | animal.mammal.wild | elephant:8 ivory:7 walrus:6 mammoth:6
ivory | material.other | tusk:7 elephant:7 white:4
rhino | animal.mammal.wild | hippo:7 elephant:6 horn:7
hippo | animal.mammal.wild | rhino:7 elephant:6 river:4
giraffe | animal.mammal.wild | tall:7 neck:8 zebra:6 savanna:6 elephant:5 spots:4
zebra | animal.mammal.wild | stripes:8 horse:7 giraffe:6 savanna:6 lion:4
camel | animal.mammal.wild | desert:8 hump:9 sand:5 oasis:5 llama:6
llama | animal.mammal.wild | alpaca:9 camel:6 wool:5
alpaca | animal.mammal.wild | llama:9 wool:6
deer | animal.mammal.wild | stag:9 doe:9 fawn:9 antler:8 reindeer:8 moose:7 elk:8 forest:5 bambi:6
reindeer | animal.mammal.wild | deer:8 santa:7 sleigh:7 antler:6 christmas:5
moose | animal.mammal.wild | elk:8 deer:7 antler:6 canada:5
elk | animal.mammal.wild | moose:8 deer:8 antler:6
antler | animal.mammal.wild | deer:8 moose:6 elk:6 horn:6 reindeer:6
horn | object.music animal.mammal.wild | trumpet:6 bull:7 rhino:7 unicorn:6 goat:5 antler:6 honk:6
rabbit | animal.mammal.rodent | bunny:9 hare:9 carrot:7 hop:7 burrow:6 ear:4 easter:6 hamster:4 fox:4 lettuce:4 magic:3 pet:4 tortoise:4
bunny | animal.mammal.rodent | rabbit:9 hop:6 easter:6
hare | animal.mammal.rodent | rabbit:9 tortoise:6
hop | action.move | jump:8 rabbit:7 kangaroo:6 frog:5 skip:6
mouse | animal.mammal.rodent object.tech | rat:8 cheese:6 cat:6 squeak:7 hamster:6 computer:6 keyboard:6 click:5 trap:5 tiny:4
rat | animal.mammal.rodent | mouse:8 sewer:6 hamster:5
hamster | animal.mammal.rodent | mouse:6 guinea:7 pet:6 rat:5 wheel:4
squirrel | animal.mammal.rodent | acorn:7 nut:6 tree:4 tail:4 chipmunk:9
chipmunk | animal.mammal.rodent | squirrel:9
beaver | animal.mammal.rodent | dam:9 river:4 tooth:4 log:4
otter | animal.mammal.marine animal.mammal.wild | beaver:5 seal:5 river:5 kelp:4
hedgehog | animal.mammal.wild | spike:6 porcupine:8
porcupine | animal.mammal.wild | hedgehog:8 spike:6
raccoon | animal.mammal.wild | mask:5 trash:5
bat | animal.mammal.wild object.toy | cave:7 vampire:6 wing:5 night:5 nocturnal:6 baseball:7 cricket:5 club:4 fly:3 halloween:4
vampire | person.fantasy | bat:6 blood:7 fang:8 dracula:9 werewolf:6 ghost:5 halloween:5 night:4 coffin:5
monkey | animal.mammal.primate | ape:8 gorilla:7 chimpanzee:8 banana:7 jungle:7 tail:4 swing:4 baboon:7 zoo:4
ape | animal.mammal.primate | monkey:8 gorilla:8 chimpanzee:8
gorilla | animal.mammal.primate | ape:8 monkey:7 chimpanzee:7 jungle:5
chimpanzee | animal.mammal.primate | ape:8 monkey:8 gorilla:7
baboon | animal.mammal.primate | monkey:7
whale | animal.mammal.marine | ocean:6 dolphin:7 orca:9 blue:4 humpback:9 fin:4 giant:5 huge:6 sea:6 shark:5 spout:7 blubber:8 krill:7 harpoon:6 seal:5 swim:4
orca | animal.mammal.marine | whale:9 dolphin:6
humpback | animal.mammal.marine | whale:9
dolphin | animal.mammal.marine | porpoise:9 whale:7 ocean:5 sea:5 shark:5 fin:5 smart:4 swim:4 seal:4 flipper:6 jump:3 wave:3
porpoise | animal.mammal.marine | dolphin:9 whale:6
seal | animal.mammal.marine object.paper | walrus:7 sea:5 otter:5 penguin:4 dolphin:4 whale:4 stamp:5 envelope:4 polar:4 fish:3
walrus | animal.mammal.marine | seal:7 tusk:6 polar:4
blubber | animal.mammal.marine | whale:8 fat:6 seal:4
flipper | body.part | fin:7 dolphin:6 seal:5 penguin:4 snorkel:5
fin | body.part | shark:8 fish:7 flipper:7 dolphin:5 whale:4 tail:4
tail | body.part | dog:5 cat:4 fin:4 comet:4 fox:5 monkey:4
paw | body.part | dog:5 cat:5 claw:6 foot:6
claw | body.part | paw:6 crab:6 bear:5 lobster:5 eagle:4 scratch:5
fang | body.part | vampire:8 tooth:7 snake:5
mane | body.part | lion:8 horse:6 hair:5
spots | quality.other | leopard:7 giraffe:4 cheetah:6 ladybug:5 dog:2
stripes | quality.other | zebra:8 tiger:8 bee:4 flag:3

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ANIMALS Â· BIRDS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
bird | animal.bird.other | feather:8 wing:8 nest:8 beak:8 fly:7 egg:6 sparrow:7 robin:7 eagle:6 parrot:6 owl:6 crow:6 pigeon:6 seagull:6 tweet:7 sky:4 flock:6 penguin:5 duck:5 chicken:4 swan:5 cage:4 migrate:6 sing:4
feather | animal.bird.other | bird:8 wing:7 pillow:5 quill:7 peacock:5 light:3 fly:3
wing | animal.bird.other | bird:8 feather:7 fly:7 angel:6 plane:5 bat:4 butterfly:4 dragon:4
nest | animal.bird.other | bird:8 egg:7 twig:5 tree:5 branch:4 home:3
beak | animal.bird.other | bird:8 parrot:5 duck:5 toucan:5
tweet | action.daily | bird:7 chirp:8
chirp | action.daily | tweet:8 bird:6 cricket:5
migrate | action.move | bird:6 goose:5 travel:4
eagle | animal.bird.prey | hawk:8 falcon:8 bird:6 prey:6 talon:7 soar:7 bald:5 feather:4 mountain:3 owl:5 vulture:6 nest:4 claw:4 wing:4
hawk | animal.bird.prey | eagle:8 falcon:8 prey:6 bird:6
falcon | animal.bird.prey | hawk:8 eagle:8 fast:4
vulture | animal.bird.prey | eagle:6 desert:3
talon | body.part | claw:8 eagle:7 hawk:6
soar | action.move | fly:8 glide:7 eagle:6
owl | animal.bird.prey | hoot:9 night:6 wise:7 nocturnal:7 bird:6 eagle:5 hawk:5 feather:4 moon:3 mouse:4 forest:4 wisdom:6
hoot | action.daily | owl:9
parrot | animal.bird.other | macaw:9 pirate:6 bird:6 tropical:6 talk:5 jungle:5 colorful:5 feather:4 toucan:6 cage:4
macaw | animal.bird.other | parrot:9 tropical:5
toucan | animal.bird.other | parrot:6 beak:5 tropical:5 jungle:4
penguin | animal.bird.sea | antarctica:8 ice:5 polar:5 iceberg:5 cold:4 fish:4 seal:4 tuxedo:5 bird:5 waddle:7 snow:4 flipper:4 swim:3 puffin:5
antarctica | nature.land.habitat | penguin:8 ice:6 polar:7 cold:5
puffin | animal.bird.sea | penguin:5 seagull:4 bird:5
seagull | animal.bird.sea | gull:9 beach:5 bird:6 sea:5 pelican:5 coast:5 harbor:4 fish:3 albatross:5
gull | animal.bird.sea | seagull:9 bird:5
pelican | animal.bird.sea | seagull:5 beak:5 fish:4 bird:5
albatross | animal.bird.sea | seagull:5 ocean:4 bird:5
duck | animal.bird.farm | goose:7 quack:9 pond:6 swan:6 duckling:9 bird:5 feather:4 bread:3 chicken:4 lake:4
duckling | animal.bird.farm | duck:9 chick:6
quack | action.daily | duck:9
goose | animal.bird.farm | duck:7 swan:6 gander:8 migrate:5
swan | animal.bird.farm animal.bird.other | goose:6 duck:6 lake:5 ballet:4 white:3 elegant:4
chicken | animal.bird.farm food.meat | hen:9 rooster:8 chick:8 egg:7 cluck:8 farm:6 poultry:9 turkey:6 duck:4 coop:7 bird:4 fox:3 nugget:6
hen | animal.bird.farm | chicken:9 egg:6 rooster:7 chick:6
rooster | animal.bird.farm | chicken:8 hen:7 dawn:5 crow:5 morning:3
chick | animal.bird.farm | chicken:8 hen:6 duckling:6 egg:5
turkey | animal.bird.farm food.meat | chicken:6 thanksgiving:8 roast:5
poultry | animal.bird.farm | chicken:9 turkey:6 duck:5
coop | place.building.farm | chicken:7 hen:5
crow | animal.bird.other | raven:9 bird:6 black:4 scarecrow:6 rooster:3
raven | animal.bird.other | crow:9 black:4
scarecrow | object.decoration | crow:6 field:5 farm:5 straw:5
pigeon | animal.bird.other | dove:9 bird:6 city:4
dove | animal.bird.other | pigeon:9 peace:7 white:3
robin | animal.bird.other | sparrow:7 bird:7 spring:3
sparrow | animal.bird.other | robin:7 bird:7 finch:7
finch | animal.bird.other | sparrow:7 bird:6
flamingo | animal.bird.other | pink:8 tropical:4 lagoon:4 bird:5
peacock | animal.bird.other | feather:6 tail:5 colorful:5 bird:5
ostrich | animal.bird.other | emu:8 bird:5 egg:4 fast:3

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ANIMALS Â· SEA LIFE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
fish | animal.sea.fish food.meat | fin:7 gill:8 scale:6 swim:6 ocean:5 sea:5 shark:5 salmon:7 tuna:7 trout:7 goldfish:7 fishing:8 net:6 aquarium:7 pond:4 river:5 lake:5 hook:5 chips:4 sushi:5 reef:5 water:4
gill | body.part | fish:8 fin:5 shark:4
scale | body.part object.tool | fish:6 snake:5 weight:6 dragon:3 lizard:4
shark | animal.sea.fish | fin:8 jaws:8 tooth:6 ocean:5 predator:7 whale:5 dolphin:5 fish:5 bite:6 hammerhead:9 great:3 reef:4 surf:3 swim:3 sea:5
hammerhead | animal.sea.fish | shark:9
jaws | body.part | shark:8 mouth:6 bite:6
predator | animal | prey:8 hunt:7 shark:6 lion:6 wolf:6 tiger:6 eagle:5
prey | animal | predator:8 hunt:6 eagle:5
salmon | animal.sea.fish food.meat | fish:7 trout:7 river:5 bear:4 pink:3 sushi:5 tuna:6
trout | animal.sea.fish | fish:7 salmon:7 river:4
tuna | animal.sea.fish food.meat | fish:7 salmon:6 sushi:6 sandwich:3
goldfish | animal.sea.fish | fish:7 bowl:5 pet:5 aquarium:6 orange:3
eel | animal.sea.fish | snake:5 fish:5 electric:5 slippery:5
aquarium | place.building.public | fish:7 goldfish:6 tank:6 reef:4 dolphin:3
octopus | animal.sea.other | tentacle:9 squid:9 ink:7 arm:5 eight:6 kraken:8 sea:5 ocean:5 jellyfish:5 suction:6 clever:3 crab:4 reef:4
squid | animal.sea.other | octopus:9 ink:7 tentacle:8 calamari:9 kraken:6
tentacle | body.part | octopus:9 squid:8 jellyfish:6
kraken | person.fantasy animal.myth | octopus:8 squid:6 sea:4 monster:6 pirate:4
jellyfish | animal.sea.other | sting:7 tentacle:6 octopus:5 transparent:5 beach:4 ocean:4 jelly:5
starfish | animal.sea.other | star:5 beach:5 tide:4 reef:4 shell:4 ocean:4
seahorse | animal.sea.other | horse:3 reef:4 ocean:4 fish:5
coral | animal.sea.other | reef:9 ocean:5 tropical:5 pink:3 diving:5 fish:4 lagoon:5
crab | animal.sea.shellfish | claw:7 lobster:8 shell:5 beach:5 shrimp:6 pinch:6 sideways:6 hermit:6 sand:4 ocean:4 seafood:6 tide:3
hermit | animal.sea.shellfish | crab:6 shell:4
lobster | animal.sea.shellfish | crab:8 claw:6 shrimp:7 seafood:7 red:4
shrimp | animal.sea.shellfish | prawn:9 lobster:7 crab:6 seafood:6
prawn | animal.sea.shellfish | shrimp:9 seafood:6
clam | animal.sea.shellfish | oyster:8 mussel:8 shell:6 pearl:4 seafood:5
oyster | animal.sea.shellfish | clam:8 pearl:8 mussel:7 shell:6 seafood:6
mussel | animal.sea.shellfish | clam:8 oyster:7 seafood:5
seafood | food.meat | fish:6 crab:6 lobster:7 shrimp:6 oyster:6 sushi:5
pearl | object.jewelry material.gem | oyster:8 necklace:7 white:4 jewel:6 clam:4 diamond:5
krill | animal.sea.other | whale:7 shrimp:5

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ANIMALS Â· REPTILES, AMPHIBIANS, BUGS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
snake | animal.reptile | serpent:9 python:8 cobra:8 viper:8 venom:7 hiss:8 slither:8 lizard:6 scale:5 fang:5 rattle:6 jungle:3 eel:5 desert:3
serpent | animal.reptile | snake:9 dragon:4
python | animal.reptile | snake:8 cobra:6
cobra | animal.reptile | snake:8 python:6 venom:6
viper | animal.reptile | snake:8 venom:6
venom | quality.other | poison:8 snake:7 sting:5 spider:5 scorpion:5
poison | quality.other | venom:8 toxic:8 snake:4
hiss | action.daily | snake:8 cat:4
lizard | animal.reptile | gecko:9 iguana:9 chameleon:8 reptile:8 snake:6 crocodile:5 scale:4 desert:4 dragon:4 tail:3
gecko | animal.reptile | lizard:9
iguana | animal.reptile | lizard:9
chameleon | animal.reptile | lizard:8 camouflage:7
crocodile | animal.reptile | alligator:9 swamp:6 lizard:5 river:4 jaws:5 teeth:4 reptile:7
alligator | animal.reptile | crocodile:9 swamp:6
reptile | animal.reptile | lizard:8 snake:7 crocodile:7 turtle:6 dinosaur:5
turtle | animal.reptile animal.sea.other | tortoise:9 shell:8 slow:7 sea:4 beach:4 terrapin:9 hare:3 reef:3 pond:4
tortoise | animal.reptile | turtle:9 slow:7 shell:7 hare:6
dinosaur | animal.reptile | fossil:8 extinct:8 tyrannosaurus:9 jurassic:9 reptile:5 dragon:4 mammoth:4 bone:5 museum:4 roar:4
fossil | nature.land.ground | dinosaur:8 bone:6 extinct:6 rock:4 museum:4
frog | animal.amphibian | toad:9 tadpole:9 croak:9 pond:6 lily:4 jump:5 green:4 prince:4 swamp:6 lizard:3
toad | animal.amphibian | frog:9 toadstool:3
tadpole | animal.amphibian | frog:9 pond:5
croak | action.daily | frog:9 toad:6
bee | animal.small.insect | honey:9 hive:9 bumblebee:9 sting:8 buzz:8 pollen:7 wasp:7 flower:6 beehive:9 queen:4 insect:6 butterfly:4 ant:4 yellow:3 garden:3
hive | animal.small.insect | bee:9 beehive:9 honey:7
beehive | animal.small.insect | hive:9 bee:9 honey:7
bumblebee | animal.small.insect | bee:9 buzz:6
wasp | animal.small.insect | hornet:9 bee:7 sting:8
hornet | animal.small.insect | wasp:9 sting:7
sting | action.daily | bee:8 wasp:8 jellyfish:7 scorpion:6 pain:5
buzz | action.daily | bee:8 fly:5 mosquito:5
insect | animal.small.insect | bug:9 beetle:7 ant:6 bee:6 fly:6 butterfly:5 mosquito:6 spider:5
bug | animal.small.insect | insect:9 beetle:7 ant:6 spider:5 error:4
ant | animal.small.insect | anthill:9 colony:7 insect:6 bee:4 picnic:4 termite:7 tiny:4
termite | animal.small.insect | ant:7 wood:5
beetle | animal.small.insect | bug:7 insect:7 ladybug:7 scarab:8
ladybug | animal.small.insect | beetle:7 spots:6 red:4
butterfly | animal.small.insect | caterpillar:9 moth:8 wing:6 cocoon:8 flower:5 colorful:5 meadow:4 nectar:6 bee:4 garden:3 dragonfly:5 monarch:7
caterpillar | animal.small.insect | butterfly:9 cocoon:7 leaf:4 worm:5 moth:6
cocoon | animal.small.insect | caterpillar:7 butterfly:8 silk:5
moth | animal.small.insect | butterfly:8 lamp:5 caterpillar:6 night:4
nectar | food.sweet | flower:6 bee:5 butterfly:6 honey:6
dragonfly | animal.small.insect | butterfly:5 pond:5 wing:4
firefly | animal.small.insect | glow:7 night:5 lantern:3 summer:4 light:4 beetle:4
mosquito | animal.small.insect | bite:7 itch:7 fly:6 swamp:4 malaria:7 buzz:5
fly | animal.small.insect action.move | soar:8 wing:7 bird:7 plane:6 float:5 mosquito:6 insect:6 buzz:5 kite:5 pilot:5 glide:6 jump:3
cricket | animal.small.insect activity.sport | grasshopper:9 chirp:5 bat:5 ball:4
grasshopper | animal.small.insect | cricket:9 locust:8 jump:5
spider | animal.small.crawler | web:9 tarantula:9 spin:6 eight:5 insect:5 scorpion:6 fly:4 venom:5 creepy:5 halloween:4 silk:5
web | animal.small.crawler object.tech | spider:9 internet:7 net:5 silk:5
tarantula | animal.small.crawler | spider:9
scorpion | animal.small.crawler | sting:6 desert:5 spider:6 venom:5
worm | animal.small.crawler | earthworm:9 soil:5 caterpillar:5 bird:4 hook:4 dirt:4 snail:4
snail | animal.small.crawler | slug:9 shell:5 slow:6 slime:6
slug | animal.small.crawler | snail:9 slime:6

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ FOOD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
food | food.meal | meal:8 eat:8 dinner:6 lunch:6 breakfast:6 hungry:7 cook:6 snack:6 kitchen:4 dish:6
meal | food.mealtime | food:8 dinner:7 lunch:7 breakfast:7 dish:6 eat:6
dish | food.meal object.kitchen | meal:6 plate:7 bowl:5 recipe:5
eat | action.daily | food:8 hungry:7 chew:7 bite:6 meal:6 dinner:5 drink:4 cook:4
hungry | quality.other | eat:7 food:7 starving:9 appetite:8 thirst:5
breakfast | food.mealtime | morning:6 cereal:7 pancake:6 egg:6 toast:7 bacon:6 coffee:5 lunch:6 dinner:5 meal:7 juice:4
lunch | food.mealtime | dinner:7 breakfast:6 sandwich:6 noon:5 meal:7 picnic:4
dinner | food.mealtime | supper:9 lunch:7 meal:7 evening:5 feast:6 breakfast:5 dish:5 table:4
supper | food.mealtime | dinner:9 meal:6 evening:4
feast | food.mealtime | banquet:9 dinner:6 meal:5 party:4
picnic | activity.leisure food.mealtime | basket:7 blanket:6 sandwich:6 park:6 ant:4 lunch:5 summer:4 meadow:3
snack | food.snack | chips:6 crisps:6 cookie:5 popcorn:6 nut:4 food:6 hungry:4
apple | food.fruit | pear:7 fruit:7 orchard:8 cider:7 pie:5 red:5 tree:4 banana:5 orange:5 grape:4 core:6 juice:5 crunchy:5 teacher:3 seed:3 cherry:4 peach:5 strawberry:4 newton:3
pear | food.fruit | apple:7 fruit:6 peach:5
fruit | food.fruit | apple:7 banana:6 orange:6 grape:6 berry:6 juice:5 tropical:4 pear:6 mango:5 sweet:5 orchard:6 peach:5 cherry:5 strawberry:5 lemon:5 vegetable:5 salad:3 smoothie:5
orchard | place.outdoor | apple:8 fruit:6 tree:5 pear:5 cherry:5
cider | drink.cold | apple:7 juice:5
banana | food.fruit | peel:7 monkey:7 yellow:7 fruit:6 apple:5 mango:5 tropical:6 bunch:5 split:4 smoothie:5 plantain:9 slip:3 coconut:4 pineapple:5 ripe:5
peel | action.make | banana:7 orange:5 potato:4
orange | food.fruit color.orange | citrus:8 lemon:7 tangerine:9 mandarin:9 juice:7 fruit:6 apple:5 lime:6 grapefruit:7 peel:5 vitamin:4 peach:4
tangerine | food.fruit | orange:9 mandarin:9 citrus:6
mandarin | food.fruit | orange:9 tangerine:9
lemon | food.fruit color.yellow | lime:8 citrus:8 sour:8 lemonade:9 orange:7 yellow:6 juice:5 grapefruit:6 tart:5 zest:6 tea:3
lime | food.fruit color.green | lemon:8 citrus:8 sour:6 green:4
citrus | food.fruit | lemon:8 orange:8 lime:8 grapefruit:7
grapefruit | food.fruit | orange:7 citrus:7 lemon:6
sour | quality.taste | lemon:8 tart:8 bitter:6 sweet:6 vinegar:6 lime:6
grape | food.fruit | vine:6 wine:7 raisin:8 vineyard:8 berry:5 fruit:6 purple:4 cherry:4 juice:4
raisin | food.fruit | grape:8 dried:5
vineyard | place.outdoor | grape:8 wine:8 vine:6
cherry | food.fruit | berry:6 strawberry:6 red:5 pie:5 blossom:5 grape:4 apple:4 plum:6
berry | food.fruit | strawberry:8 blueberry:9 raspberry:9 cherry:6 fruit:6 bush:4 jam:4
strawberry | food.fruit | berry:8 raspberry:8 blueberry:6 cherry:6 cream:6 jam:6 red:5 fruit:5 shortcake:6 apple:4 smoothie:4 sweet:4 field:2
raspberry | food.fruit | berry:9 strawberry:8 blueberry:7
blueberry | food.fruit | berry:9 raspberry:7 muffin:6 blue:3
plum | food.fruit | prune:8 cherry:6 peach:6 purple:3
peach | food.fruit | apricot:8 nectarine:9 plum:6 fruit:5 apple:5 pear:5 fuzzy:4
apricot | food.fruit | peach:8
mango | food.fruit | papaya:8 tropical:7 fruit:5 banana:5 pineapple:6 smoothie:4
papaya | food.fruit | mango:8 tropical:6
pineapple | food.fruit | tropical:7 mango:6 coconut:5 banana:5 pizza:3 juice:4
coconut | food.fruit | palm:8 tropical:7 island:5 milk:5 beach:4 shell:4 pineapple:5 husk:7 nut:5 mango:4 banana:4 cocoa:3
watermelon | food.fruit | melon:9 seed:4 summer:5 juicy:6 green:2
melon | food.fruit | watermelon:9 cantaloupe:9 fruit:5
kiwi | food.fruit animal.bird.other | fruit:5 green:3
tropical | nature.land.habitat | island:7 palm:7 jungle:7 coconut:7 mango:6 parrot:6 beach:5 humid:6 rainforest:6 pineapple:6
vegetable | food.vegetable | carrot:7 potato:6 broccoli:7 lettuce:6 salad:6 fruit:5 garden:4 healthy:5 tomato:5 cabbage:6 vegan:6 farm:3 spinach:6 pea:6
carrot | food.vegetable | rabbit:7 orange:4 vegetable:7 root:4 potato:5 snowman:4 parsnip:8 beet:6 radish:6 pea:4
potato | food.vegetable food.staple | chips:7 fries:8 mash:8 vegetable:6 carrot:5 onion:5 tomato:4 soup:4 peel:4 root:3 yam:8
tomato | food.vegetable food.fruit | ketchup:7 salad:6 sauce:7 pizza:5 red:5 vegetable:5 potato:4 cucumber:4 pasta:4
onion | food.vegetable | garlic:8 cry:5 tear:5 shallot:9 soup:4 potato:5 leek:7
garlic | food.vegetable food.seasoning | onion:8 vampire:5 bread:4 herb:5
lettuce | food.vegetable | salad:8 cabbage:7 spinach:6 rabbit:4 sandwich:4
cabbage | food.vegetable | lettuce:7 broccoli:6 kale:7 cauliflower:7
broccoli | food.vegetable | cauliflower:8 cabbage:6 vegetable:7 green:4 spinach:5
cauliflower | food.vegetable | broccoli:8 cabbage:7
spinach | food.vegetable | kale:7 lettuce:6 broccoli:5 green:3
kale | food.vegetable | spinach:7 cabbage:7
cucumber | food.vegetable | pickle:8 salad:6 zucchini:7 lettuce:4 tomato:4 cool:3
pickle | food.vegetable | cucumber:8 vinegar:6 jar:4
corn | food.vegetable food.staple | maize:9 popcorn:7 cob:7 field:4 yellow:3 wheat:5
popcorn | food.snack | corn:7 cinema:7 movie:6 snack:6 butter:4
pea | food.vegetable | pod:7 bean:7 green:4 carrot:4
bean | food.vegetable | pea:7 lentil:7 soy:6 coffee:4 seed:4 sprout:3
pumpkin | food.vegetable | halloween:8 squash:8 jack:4 orange:5 pie:5 autumn:6 carve:5 lantern:4 seed:4 gourd:7 harvest:5 soup:4 carriage:4
squash | food.vegetable | pumpkin:8 zucchini:7 gourd:7
zucchini | food.vegetable | squash:7 cucumber:7
gourd | food.vegetable | pumpkin:7 squash:7
pepper | food.vegetable food.seasoning | chili:7 salt:7 spicy:6 paprika:6 jalapeno:7
chili | food.vegetable food.seasoning | pepper:7 spicy:8 hot:5 jalapeno:8
spicy | quality.taste | hot:6 chili:8 pepper:6 curry:6
bread | food.staple | loaf:9 toast:8 baguette:9 bakery:8 dough:8 flour:7 butter:6 sandwich:7 bake:7 crust:6 yeast:7 wheat:6 cake:4 roll:6 jam:4 cheese:3 rice:4 slice:4 crumb:6 croissant:6
loaf | food.staple | bread:9 slice:5
toast | food.staple | bread:8 butter:6 toaster:9 breakfast:6 jam:5
baguette | food.staple | bread:9 france:5
bakery | place.building.public | bread:8 baker:9 cake:6 pastry:7 bake:6
baker | person.job | bakery:9 bread:7 cake:5 chef:5 bake:7
bake | action.make | oven:8 bread:7 cake:7 cookie:6 baker:7 flour:5
dough | food.staple | bread:8 flour:7 pizza:5 knead:7 yeast:6 cookie:4
flour | food.staple | dough:7 bread:7 wheat:7 bake:5 cake:4 sugar:4
wheat | food.staple | flour:7 bread:6 grain:7 field:5 corn:5 harvest:5 farm:4
grain | food.staple | wheat:7 rice:6 sand:5 cereal:6 oat:7
cereal | food.staple | breakfast:7 milk:6 grain:6 oat:6 bowl:4
oat | food.staple | oatmeal:9 cereal:6 grain:7 porridge:7
porridge | food.staple | oatmeal:9 oat:7 breakfast:5
rice | food.staple | sushi:6 grain:6 noodle:5 pasta:5 bread:4 bowl:4 curry:5
pasta | food.staple food.meal | spaghetti:9 noodle:8 macaroni:9 italy:6 sauce:6 tomato:4 pizza:6 cheese:4 rice:5 lasagna:7
spaghetti | food.meal | pasta:9 noodle:7 meatball:7
noodle | food.staple | pasta:8 ramen:9 spaghetti:7 soup:5 rice:5
pizza | food.meal | cheese:7 pepperoni:8 slice:6 italy:6 crust:6 dough:5 tomato:5 pasta:6 burger:5 oven:4 sauce:5 mozzarella:7 delivery:5 sandwich:4 topping:6 mushroom:3
burger | food.meal | hamburger:9 cheeseburger:9 fries:7 beef:6 bun:7 sandwich:6 pizza:5 hotdog:6 ketchup:5 grill:4
fries | food.snack | chips:8 potato:8 burger:7 ketchup:6
chips | food.snack | crisps:9 fries:8 potato:7 snack:6 fish:4
crisps | food.snack | chips:9 snack:6
hotdog | food.meal | sausage:8 burger:6 mustard:6 bun:6
sausage | food.meat | hotdog:8 bacon:5 meat:6 pork:5
sandwich | food.meal | bread:7 lunch:6 burger:6 toast:5 ham:5 cheese:4 picnic:5 bun:4 sub:6 wrap:6 tuna:3
soup | food.meal | broth:9 stew:8 bowl:7 spoon:6 chowder:9 noodle:5 vegetable:4 onion:4 tomato:4 hot:3 pot:5 ladle:6 cream:3 bread:3
broth | food.meal | soup:9 stew:6
stew | food.meal | soup:8 broth:6 pot:5 meat:4 casserole:7
salad | food.meal | lettuce:8 vegetable:6 tomato:5 cucumber:5 dressing:7 healthy:5 bowl:4
sushi | food.meal | rice:6 fish:5 seaweed:4 japan:7 salmon:5 tuna:6 raw:5 chopsticks:6
curry | food.meal | spicy:6 rice:5 india:6 sauce:5
taco | food.meal | burrito:8 mexico:7 tortilla:8
sauce | food.seasoning | ketchup:6 gravy:7 tomato:6 pasta:5 dip:5
ketchup | food.seasoning | tomato:7 sauce:6 mustard:7 fries:5 burger:4
mustard | food.seasoning | ketchup:7 hotdog:6 yellow:3
salt | food.seasoning | pepper:7 sea:5 ocean:4 salty:9 sugar:5 seasoning:7 crystal:3
sugar | food.sweet | sweet:8 candy:7 honey:6 salt:5 cake:5 syrup:6 cookie:5 flour:4
sweet | quality.taste | sugar:8 candy:8 honey:7 dessert:7 sour:6 cake:5 chocolate:5 cute:4
syrup | food.sweet | maple:8 pancake:7 sugar:6 honey:6
honey | food.sweet | bee:9 hive:7 beehive:7 sweet:7 nectar:6 syrup:6 sugar:6 bear:6 jar:5 golden:5 sticky:6 tea:4 toast:3 pollen:4
jam | food.sweet | jelly:8 marmalade:9 strawberry:6 toast:5 bread:4 jar:4
jelly | food.sweet | jam:8 jellyfish:3 wobble:5
candy | food.sweet | sweet:8 chocolate:7 lollipop:9 sugar:7 dessert:6 gum:6 caramel:6 halloween:4 toffee:7
lollipop | food.sweet | candy:9 sweet:6
chocolate | food.sweet | cocoa:9 cacao:9 candy:7 sweet:5 dessert:7 cake:6 brownie:8 caramel:6 vanilla:6 milk:4 truffle:6 fudge:8 cookie:5 bar:4 easter:4
cocoa | food.sweet drink.hot | chocolate:9 cacao:9 drink:4 marshmallow:5
cacao | food.sweet | cocoa:9 chocolate:9
brownie | food.sweet | chocolate:8 cake:6 cookie:6
fudge | food.sweet | chocolate:8 caramel:6
caramel | food.sweet | toffee:8 chocolate:6 candy:6
toffee | food.sweet | caramel:8 candy:7
vanilla | food.seasoning | chocolate:6 icecream:6 cream:4
truffle | food.sweet nature.plant.other | chocolate:6 mushroom:7
marshmallow | food.sweet | campfire:8 cocoa:5 candy:5
dessert | food.sweet | cake:7 pudding:8 icecream:7 pie:6 sweet:7 candy:6 chocolate:7 cookie:5
pudding | food.sweet | dessert:8 custard:7 cake:5
icecream | food.sweet | dessert:7 gelato:9 cone:7 sundae:8 summer:5 vanilla:6 cold:3 cream:5
cake | food.sweet | cupcake:9 birthday:8 dessert:7 frosting:8 icing:8 candle:5 bake:7 pie:6 cookie:6 chocolate:6 bread:4 sugar:5 party:5 wedding:5 slice:5 muffin:7 oven:4 flour:4
cupcake | food.sweet | cake:9 muffin:7 frosting:6
muffin | food.sweet | cupcake:7 cake:7 blueberry:5
frosting | food.sweet | icing:9 cake:8 cupcake:6
icing | food.sweet | frosting:9 cake:8
cookie | food.sweet | biscuit:9 cracker:6 cake:6 chocolate:5 oven:4 bake:6 jar:4 milk:5 dough:4 brownie:6
biscuit | food.sweet | cookie:9 cracker:7
cracker | food.snack | biscuit:7 cookie:6 cheese:4
pie | food.sweet | tart:8 apple:5 cherry:5 crust:6 pumpkin:5 cake:6 dessert:6
tart | food.sweet | pie:8 sour:5
pancake | food.sweet food.staple | waffle:8 crepe:9 syrup:7 breakfast:6
waffle | food.sweet | pancake:8 syrup:6
donut | food.sweet | doughnut:9 cake:5 police:3
doughnut | food.sweet | donut:9
cheese | food.dairy | cheddar:9 mozzarella:9 brie:9 milk:7 cheeseburger:6 pizza:7 mouse:6 cracker:5 dairy:8 butter:6 yogurt:6 cow:4 goat:3 wine:4 sandwich:4 cream:5 fondue:7 slice:3
cheddar | food.dairy | cheese:9
mozzarella | food.dairy | cheese:9 pizza:7
brie | food.dairy | cheese:9
dairy | food.dairy | milk:8 cheese:8 butter:7 yogurt:7 cream:7 cow:6
milk | food.dairy drink.cold | cow:8 dairy:8 cheese:7 cream:7 butter:6 yogurt:6 cereal:6 coffee:5 cookie:5 white:4 calcium:6 baby:3 tea:4 drink:5 chocolate:4 bottle:4
cream | food.dairy | milk:7 butter:6 cheese:5 icecream:5 coffee:4 strawberry:5 dairy:7
butter | food.dairy | margarine:9 bread:6 toast:6 milk:6 cream:6 cheese:6 dairy:7 knife:3
yogurt | food.dairy | milk:6 cheese:6 dairy:7 cream:5
egg | food.dairy animal.bird.farm | chicken:7 yolk:9 omelet:8 nest:7 shell:5 breakfast:6 hen:6 bird:5 bacon:6 easter:6 fry:4 hatch:7 chick:5
yolk | food.dairy | egg:9
omelet | food.meal | egg:8 breakfast:5
meat | food.meat | beef:8 pork:7 steak:8 chicken:6 lamb:5 sausage:6 bacon:6 butcher:8 grill:5 ham:6 fish:4
beef | food.meat | steak:8 cow:6 meat:8 burger:6 pork:6
steak | food.meat | beef:8 meat:8 grill:6
pork | food.meat | pig:7 bacon:7 ham:7 meat:7 beef:6
bacon | food.meat | pork:7 ham:6 egg:6 breakfast:6 pig:6 sausage:5
ham | food.meat | pork:7 bacon:6 sandwich:5
grill | object.kitchen | barbecue:9 steak:6 burger:4 meat:5
barbecue | activity.leisure | grill:9 summer:4 meat:5 sausage:5
butcher | person.job | meat:8 knife:5

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ DRINKS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
drink | drink | beverage:9 water:7 thirst:7 juice:6 cup:5 glass:5 sip:7 milk:5 straw:3 coffee:5 tea:5 soda:5
beverage | drink | drink:9
thirst | quality.other | drink:7 water:6 thirsty:9 dry:5 desert:5
sip | action.daily | drink:7 cup:4 tea:4
coffee | drink.hot | espresso:9 latte:9 cappuccino:9 caffeine:8 bean:5 mug:7 cafe:8 tea:7 cup:6 morning:5 milk:5 cream:4 sugar:4 breakfast:4 cocoa:5 brew:6 roast:5
espresso | drink.hot | coffee:9 latte:7 cappuccino:7
latte | drink.hot | coffee:9 cappuccino:8 espresso:7 milk:5
cappuccino | drink.hot | coffee:9 latte:8 espresso:7
caffeine | drink.hot | coffee:8 tea:6 energy:5
cafe | place.building.public | coffee:8 tea:5 shop:4 latte:5
mug | object.kitchen | cup:9 coffee:7 tea:6
tea | drink.hot | teapot:9 kettle:7 coffee:7 cup:6 mug:6 leaf:4 green:3 herbal:7 chamomile:8 milk:4 sugar:3 lemon:3 biscuit:4 honey:4 brew:6 caffeine:5 cocoa:4
teapot | object.kitchen | tea:9 kettle:7 cup:5
brew | action.make | coffee:6 tea:6 beer:5
juice | drink.cold | orange:7 apple:5 smoothie:7 lemonade:6 fruit:5 drink:6 water:3 glass:4
smoothie | drink.cold | juice:7 milkshake:7 banana:5 fruit:5
milkshake | drink.cold | smoothie:7 milk:6 icecream:5
lemonade | drink.cold | lemon:9 juice:6 soda:6 summer:3
soda | drink.cold | pop:7 cola:9 lemonade:6 fizzy:8 drink:5 juice:4
cola | drink.cold | soda:9
wine | drink.alcohol | grape:7 vineyard:8 beer:6 glass:5 red:3 cheese:4 cork:7 bottle:5 champagne:7
champagne | drink.alcohol | wine:7 celebrate:6 bubble:4
beer | drink.alcohol | wine:6 pub:7 ale:9 brew:5 bar:5
pub | place.building.public | beer:7 bar:7
bar | place.building.public object.misc | pub:7 beer:5 chocolate:3 drink:4

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ KITCHEN & HOME OBJECTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
kitchen | place.room | cook:7 oven:7 stove:7 fridge:7 sink:6 chef:6 pan:5 pot:5 bake:4 knife:4 spoon:3 recipe:4 cupboard:5
cook | action.make | chef:8 kitchen:7 bake:6 food:6 recipe:7 boil:5 fry:7 stove:6 oven:5 pan:5
chef | person.job | cook:8 kitchen:6 restaurant:7 recipe:5 baker:5 knife:3
recipe | object.paper | cook:7 cookbook:9 ingredient:7 chef:5
restaurant | place.building.public | chef:7 menu:8 waiter:8 dinner:5 cafe:6 food:5
oven | object.kitchen | bake:8 stove:7 cake:4 bread:4 hot:4 heat:5 kitchen:7 microwave:7
stove | object.kitchen | oven:7 cook:6 kitchen:7 pan:5 pot:5 kettle:4
microwave | object.kitchen | oven:7 kitchen:5
fridge | object.kitchen | refrigerator:9 freezer:8 cold:5 kitchen:7 milk:4
refrigerator | object.kitchen | fridge:9 freezer:7
freezer | object.kitchen | fridge:8 ice:6 frozen:6 cold:5
sink | object.kitchen | tap:7 faucet:7 dishes:6 wash:6 kitchen:6 bathroom:4
kettle | object.kitchen | tea:7 teapot:7 boil:6 steam:6 stove:4
pot | object.kitchen | pan:8 stew:5 soup:5 kettle:5 cook:5 stove:5 plant:4 lid:5 cauldron:6
cauldron | object.kitchen | pot:6 witch:7 potion:7
pan | object.kitchen | pot:8 frying:7 skillet:9 stove:5 cook:5 fry:6
fry | action.make | pan:6 cook:7 egg:4 fries:4
plate | object.kitchen | dish:7 bowl:7 fork:5 cup:5 saucer:7
bowl | object.kitchen | plate:7 soup:7 cereal:4 spoon:5 cup:5 dish:5
cup | object.kitchen | mug:9 glass:6 saucer:7 tea:6 coffee:6 plate:5 bowl:5 trophy:4 drink:5
saucer | object.kitchen | cup:7 plate:7 ufo:3
glass | object.kitchen material.other | cup:6 window:6 mirror:5 bottle:5 transparent:6 drink:5 sand:4 crystal:5 wine:5 glasses:5 shatter:6
bottle | object.container | jar:6 glass:5 water:5 cork:6 wine:5 message:4 milk:4 cap:4
jar | object.container | bottle:6 honey:5 jam:4 lid:5 cookie:4 pickle:4
spoon | object.kitchen | fork:8 knife:7 soup:6 ladle:7 bowl:5 cutlery:8 teaspoon:9
fork | object.kitchen | spoon:8 knife:8 cutlery:8 plate:5
knife | object.kitchen object.weapon | fork:8 spoon:7 blade:8 cut:7 sharp:7 dagger:7 sword:6 cutlery:7 chef:3 butter:3
cutlery | object.kitchen | spoon:8 fork:8 knife:7
ladle | object.kitchen | spoon:7 soup:6
chopsticks | object.kitchen | sushi:6 fork:5 noodle:4
table | object.furniture | chair:8 desk:7 dinner:4 wood:4 furniture:7 tablecloth:8 bench:5 sofa:4 dining:6 kitchen:3 plate:3
chair | object.furniture | seat:9 stool:8 table:8 sofa:6 sit:7 furniture:7 bench:7 armchair:9 throne:6 desk:5 couch:5 cushion:4 rocking:5
seat | object.furniture | chair:9 bench:6 sit:6 couch:5
stool | object.furniture | chair:8 seat:6
bench | object.furniture | chair:7 seat:6 park:5 table:5
throne | object.furniture | king:8 crown:6 queen:6 chair:6 royal:7 castle:4
furniture | object.furniture | chair:7 table:7 sofa:7 bed:6 desk:6
sofa | object.furniture | couch:9 armchair:7 chair:6 cushion:6 living:4 bed:4
couch | object.furniture | sofa:9 cushion:6 chair:5
cushion | object.furniture | pillow:8 sofa:6 couch:6 chair:4
sit | action.daily | chair:7 seat:6 bench:5 couch:4
bed | object.furniture | pillow:8 blanket:8 mattress:9 sleep:8 sheet:7 bedroom:8 nap:6 sofa:4 dream:4 bunk:6 crib:7
pillow | object.furniture | cushion:8 bed:8 blanket:6 sleep:5 feather:5
blanket | object.furniture | quilt:9 duvet:9 bed:8 pillow:6 warm:5 cozy:5 sheet:6 picnic:4
sheet | object.furniture object.paper | bed:7 blanket:6 paper:6 page:5
mattress | object.furniture | bed:9 pillow:5
sleep | action.daily | bed:8 nap:8 dream:7 tired:7 night:6 snore:7 rest:7 pillow:5 wake:6 yawn:6
nap | action.daily | sleep:8 rest:6 bed:6
dream | feeling.mind | sleep:7 nightmare:8 night:5 imagine:7 fantasy:6 wish:6 hope:6 bed:4 daydream:9 sleepwalk:5 pillow:3 vision:5 cloud:3 star:3
nightmare | feeling.mind | dream:8 fear:6 monster:5 sleep:5
desk | object.furniture | table:7 office:7 chair:5 drawer:6 computer:5 school:4 pen:3
drawer | object.furniture | cupboard:7 desk:6 dresser:8 shelf:5
cupboard | object.furniture | cabinet:9 closet:8 wardrobe:8 drawer:7 shelf:6 kitchen:5
wardrobe | object.furniture | closet:9 cupboard:8 clothes:6
closet | object.furniture | wardrobe:9 cupboard:8
shelf | object.furniture | bookcase:8 cupboard:6 book:5 drawer:5
lamp | object.light | light:8 lantern:7 bulb:8 shade:4 candle:6 desk:4 torch:5 moth:3 night:3 flashlight:5
light | object.light quality.other | lamp:8 bright:7 sun:6 bulb:7 dark:6 candle:6 shine:7 glow:6 lantern:5 flash:5 sunlight:7 torch:5 lighthouse:5 day:4 shadow:5
bulb | object.light | lamp:8 light:7 idea:5 tulip:3
candle | object.light | wax:9 wick:9 flame:7 light:6 lantern:6 birthday:5 cake:5 match:4 fire:5 lamp:6 torch:4 dark:3 melt:5 glow:4 chandelier:5
wax | material.other | candle:9 melt:5 crayon:5
wick | object.light | candle:9 lantern:5
lantern | object.light | lamp:7 candle:6 light:5 torch:6 flashlight:6 glow:5 firefly:3 night:3 paper:3 pumpkin:3 lighthouse:4 flame:4 camping:4
flashlight | object.light | torch:8 lantern:6 battery:5 lamp:5 dark:3
chandelier | object.light | lamp:5 candle:5 crystal:4 palace:4 ceiling:5
mirror | object.decoration | reflection:9 glass:6 reflect:9 vanity:6 image:5 face:4 selfie:5 window:4 bathroom:4 vampire:3 look:4 shiny:5 magic:3
reflection | quality.other | mirror:9 reflect:9 image:5 water:3
reflect | action.daily | mirror:9 reflection:9 light:4 think:5
clock | object.tech | time:8 watch:8 alarm:8 hour:7 minute:6 tick:8 hand:4 timer:7 calendar:4 midnight:4 hourglass:6 bell:4 tower:3 wall:3
watch | object.tech | clock:8 wrist:8 time:6 timer:5 see:5 look:5
alarm | object.tech | clock:8 wake:7 siren:7 bell:5 morning:4
tick | action.daily | clock:8 tock:9
timer | object.tech | clock:7 stopwatch:9 hourglass:7
hourglass | object.tech | sand:6 time:6 clock:6 timer:7
bell | object.music | ring:7 church:6 chime:9 alarm:5 doorbell:8 jingle:7 clock:4 school:3
ring | object.jewelry action.daily | wedding:8 diamond:7 finger:7 bell:7 jewel:6 gold:6 circle:6 necklace:6 band:5 engagement:8 phone:4 call:4 earring:6 bracelet:6 saturn:4
door | object.home | gate:7 knock:7 key:7 window:6 handle:6 lock:7 entrance:8 doorbell:8 hinge:7 wall:4 open:5 house:4 room:4
window | object.home | glass:6 door:6 curtain:8 pane:9 view:6 frame:6 wall:5 shutter:7 house:4 sill:7 light:4 roof:3 open:4
curtain | object.home | window:8 drape:8 blind:7 theater:5 stage:4
wall | object.home | brick:7 fence:6 roof:5 floor:6 door:4 window:5 castle:4 paint:3
roof | object.home | ceiling:7 chimney:6 house:5 tile:5 attic:7 wall:5 shelter:5
floor | object.home | carpet:7 ground:6 wall:6 ceiling:6 rug:6 tile:5
ceiling | object.home | roof:7 floor:6 wall:5
stairs | object.home | staircase:9 step:7 ladder:7 climb:4 upstairs:8
gate | object.home | door:7 fence:7 entrance:6
fence | object.home | gate:7 wall:6 garden:4 farm:3
brick | material.other | wall:7 house:4 clay:6 chimney:4
key | object.tool | lock:9 door:7 keyhole:9 unlock:9 padlock:7 chain:4 password:6 secret:4 treasure:3 piano:3 code:5 car:3
lock | object.tool | key:9 padlock:9 door:7 safe:7 unlock:8 chain:5 security:6
padlock | object.tool | lock:9 key:7
chain | object.tool | link:6 lock:5 anchor:5 necklace:5 rope:4 metal:4
hammer | object.tool | nail:9 tool:7 saw:6 wrench:6 screwdriver:6 build:6 mallet:9 anvil:6 hit:5 drill:5
nail | object.tool body.part | hammer:9 screw:7 finger:5 toe:4
screw | object.tool | screwdriver:9 nail:7 bolt:6
screwdriver | object.tool | screw:9 hammer:6 wrench:6 tool:6
wrench | object.tool | spanner:9 hammer:6 tool:6 screwdriver:6
saw | object.tool | hammer:6 wood:5 cut:5 axe:6 tool:6
axe | object.tool object.weapon | chop:8 wood:6 saw:6 lumberjack:7 tree:4 log:4 hatchet:9
drill | object.tool | hammer:5 hole:5 screw:5
tool | object.tool | hammer:7 wrench:6 saw:6 toolbox:9 screwdriver:6 shovel:4 drill:5
shovel | object.tool | spade:9 dig:8 dirt:4 snow:3 bucket:4 sand:3
spade | object.tool | shovel:9 dig:7 bucket:6
bucket | object.container | pail:9 spade:6 water:4 sandcastle:6 mop:5 well:4 shovel:4
sandcastle | object.toy | sand:8 beach:8 bucket:6 spade:5 castle:6
rope | object.tool | string:7 knot:8 cord:8 chain:4 ladder:5 climb:4 sail:3 lasso:7
string | object.tool | rope:7 thread:7 kite:5 guitar:5 violin:4 yarn:7
thread | object.tool | needle:8 sew:8 string:7 yarn:7 silk:5
needle | object.tool | thread:8 sew:8 pin:7 pine:4 syringe:6 sharp:5 haystack:5
ladder | object.tool | stairs:7 climb:7 rung:9 step:6 rope:5 tall:3
scissors | object.tool | cut:8 paper:5 knife:5
broom | object.tool | sweep:9 mop:7 witch:6 dust:5
mop | object.tool | broom:7 bucket:5
box | object.container | crate:8 carton:9 package:8 parcel:8 container:8 chest:6 lid:5 gift:5 cardboard:7
chest | object.container body.part | treasure:7 trunk:5 box:6 pirate:4 heart:4
basket | object.container | picnic:7 bag:5 bucket:5 wicker:9 egg:3 fruit:3
bag | object.container | sack:8 backpack:8 purse:8 suitcase:6 basket:5 pocket:5
suitcase | object.container | luggage:9 travel:7 bag:6 holiday:4
barrel | object.container | keg:8 wine:4 pirate:3
balloon | object.toy vehicle.air | party:7 helium:8 float:6 birthday:6 pop:6 air:5 bubble:4 kite:4 balloonist:5 inflate:7 string:4 basket:3 red:2
party | activity.leisure | celebration:8 birthday:8 dance:5 balloon:6 cake:5 music:4 festival:6 feast:4
birthday | activity.leisure | cake:8 party:8 candle:5 gift:6 present:6 balloon:6 age:5
gift | object.misc | present:9 box:5 birthday:6 christmas:6 wrap:6 surprise:6
present | object.misc | gift:9 birthday:6
kite | object.toy | wind:7 string:6 fly:6 tail:4 balloon:4 sky:4 beach:3 breeze:4 paper:3
toy | object.toy | doll:7 game:6 play:7 teddy:7 ball:5 puzzle:5 kite:5 child:5
doll | object.toy | toy:7 puppet:6 teddy:5
teddy | object.toy | bear:5 toy:7 doll:5
puzzle | object.toy | jigsaw:9 riddle:8 game:6 mystery:5 piece:5
riddle | activity.study | puzzle:8 mystery:6 question:5 sphinx:5
ball | object.toy | football:7 soccer:6 bounce:6 throw:6 sphere:7 round:5 tennis:5 basketball:6 baseball:6 golf:4 dance:3 balloon:3
game | activity.leisure | play:7 puzzle:6 toy:6 sport:6 match:5 board:4 dice:6 card:5 chess:6
dice | object.toy | game:6 luck:5 chess:3
chess | activity.leisure | game:6 king:5 queen:5 knight:4
card | object.paper | deck:7 game:5 letter:4 postcard:7 birthday:4
play | action.daily | game:7 toy:7 fun:6 sport:5

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ TECH, PAPER, MUSIC â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
phone | object.tech | telephone:9 call:8 mobile:9 smartphone:9 ring:4 text:7 computer:5 camera:5 screen:5 battery:4 radio:4
call | action.daily | phone:8 shout:5 ring:4
computer | object.tech | laptop:9 keyboard:8 screen:7 mouse:6 internet:7 software:8 code:6 phone:5 robot:4 tablet:7 printer:6
laptop | object.tech | computer:9 keyboard:6 screen:6 tablet:6
keyboard | object.tech object.music | computer:8 piano:6 type:7 key:4 mouse:6
screen | object.tech | monitor:9 computer:7 television:7 phone:5 display:8 movie:4
television | object.tech | tv:9 screen:7 channel:7 remote:6 radio:6 movie:5 show:5
tv | object.tech | television:9
radio | object.tech | music:6 television:6 song:4 broadcast:7 antenna:6 phone:4
internet | object.tech | web:7 computer:7 online:9 email:6
email | object.paper object.tech | letter:7 message:7 internet:6
robot | object.tech | machine:8 android:8 computer:5 metal:4 future:3 cyborg:8 artificial:6
machine | object.tech | robot:8 engine:6 gear:6
engine | object.tech | motor:9 car:6 machine:6 train:5
battery | object.tech | charge:7 power:6 energy:5 flashlight:5 phone:4
camera | object.tech | photo:9 photograph:9 lens:7 picture:8 film:7 snapshot:9 flash:6 shutter:6 video:7 tripod:7 selfie:6 phone:5 album:5
photo | activity.art | camera:9 picture:9 photograph:9 album:6 selfie:7
picture | activity.art | photo:9 painting:7 image:8 drawing:7 frame:6 camera:7
image | activity.art | picture:8 photo:6 reflection:5
painting | activity.art | paint:8 canvas:8 picture:7 art:7 artist:7 brush:7 drawing:6 frame:5 museum:5 portrait:7
paint | activity.art action.make | painting:8 brush:7 color:6 artist:6 canvas:6
brush | object.tool | paint:7 painting:6 hair:4 comb:6 toothbrush:6
art | activity.art | painting:7 artist:8 museum:6 drawing:6 sculpture:7 gallery:7
artist | person.job | art:8 painter:9 paint:6 painting:7
drawing | activity.art | sketch:9 picture:7 pencil:6 painting:6 draw:9 art:6
draw | activity.art | drawing:9 sketch:7 pencil:6
book | object.paper | novel:8 page:8 read:8 library:8 story:7 author:7 chapter:8 bookshelf:6 cover:5 paper:5 write:5 magazine:6 diary:6 poem:4 bookcase:6 dictionary:6 notebook:6 spell:3
novel | object.paper | book:8 story:7 author:6 fiction:7
page | object.paper | book:8 paper:7 chapter:5 sheet:5
read | action.daily | book:8 write:6 library:5 page:5 story:4
write | action.daily | pen:8 pencil:7 letter:6 book:5 read:6 author:6 poem:5 story:5 paper:5
story | activity.art | tale:9 book:7 novel:7 fairy:5 legend:6 narrative:8 myth:6 poem:5 campfire:3 history:4
tale | activity.art | story:9 fairy:6 legend:6
legend | activity.art | myth:8 story:6 tale:6 hero:5
myth | activity.art | legend:8 story:6 dragon:4 unicorn:4
poem | activity.art | poetry:9 verse:8 rhyme:7 song:5 story:5 poet:8
author | person.job | writer:9 book:7 novel:6 write:6
library | place.building.public | book:8 librarian:9 read:5 shelf:5 bookshelf:6 quiet:5 study:5 school:3 museum:4
paper | object.paper material.other | page:7 sheet:6 pen:5 pencil:5 book:5 letter:5 envelope:4 notebook:6 origami:6 newspaper:6 scissors:5 card:4 kite:2 cardboard:5
pen | object.paper | pencil:8 ink:7 write:8 paper:5 marker:7 quill:7 crayon:5
pencil | object.paper | pen:8 eraser:8 crayon:7 write:7 drawing:6 sharpener:7 paper:5
crayon | object.paper | pencil:7 marker:6 wax:5 drawing:4
ink | object.paper | pen:7 squid:5 octopus:5 quill:6 print:5 tattoo:5
quill | object.paper | feather:7 pen:7 ink:6
notebook | object.paper | diary:7 journal:8 book:6 paper:6 pen:4
diary | object.paper | journal:9 notebook:7 book:6 secret:4
letter | object.paper | envelope:9 mail:8 stamp:7 postcard:7 write:6 alphabet:6 note:6 email:7 postman:6 message:6 paper:5 word:5 card:4
envelope | object.paper | letter:9 stamp:7 mail:7 postcard:5
mail | object.paper | letter:8 post:8 postman:8 envelope:7 package:6 stamp:6 email:6
postman | person.job | mail:8 letter:6 parcel:5
stamp | object.paper | envelope:7 letter:7 mail:6 seal:5 postcard:5
postcard | object.paper | letter:7 card:7 stamp:5 holiday:4
message | object.paper | letter:6 note:6 email:7 text:6 bottle:4
word | activity.study | letter:5 language:7 sentence:7 dictionary:7 vocabulary:8 spell:6
map | object.nav | atlas:9 compass:7 globe:7 treasure:5 navigate:7 route:7 chart:7 legend:3 explore:5 travel:5 road:4 gps:7 world:4 pirate:3
atlas | object.nav | map:9 globe:6
globe | object.nav | map:7 earth:6 world:7 sphere:6 atlas:6
compass | object.nav | north:8 navigate:8 map:7 direction:8 needle:6 magnet:7 explore:5 sailor:4 gps:6 south:5 arrow:3 pirate:3 telescope:3
north | object.nav | south:8 compass:8 east:5 west:5 polar:4
south | object.nav | north:8 east:5 west:5
east | object.nav | west:8 north:5 south:5 sunrise:5
west | object.nav | east:8 north:5 south:5 sunset:5
direction | object.nav | compass:8 north:5 map:5 navigate:6 route:5
navigate | action.move | map:7 compass:8 sailor:5 direction:6 route:5
gps | object.nav object.tech | map:7 compass:6 navigate:7
magnet | object.tool | compass:7 iron:6 metal:5 attract:7
treasure | object.misc | gold:8 chest:7 pirate:7 map:5 jewel:6 coin:6 diamond:5 hunt:4 island:4 buried:6 shipwreck:5 cave:3
coin | object.misc | money:8 gold:6 silver:5 treasure:6 penny:9 cash:7
money | object.misc | cash:9 coin:8 bank:7 dollar:9 wallet:7 rich:6 gold:5 price:6 pay:7
bank | place.building.public nature.land.coast | money:7 river:6 cash:6 vault:6 shore:4
wallet | object.container | purse:8 money:7 bag:4 cash:6
purse | object.container | wallet:8 bag:8 handbag:9
piano | object.music | keyboard:6 key:4 grand:5 pianist:9 chord:6 note:6 music:6 guitar:5 violin:5 organ:7 melody:5 concert:5
guitar | object.music | strum:9 string:6 chord:7 bass:7 ukulele:8 banjo:7 rock:4 band:6 music:6 piano:5 violin:5 song:5 pick:4 amplifier:6 campfire:3 drum:5
ukulele | object.music | guitar:8 hawaii:6 string:4
banjo | object.music | guitar:7 string:4
violin | object.music | fiddle:9 cello:8 bow:6 string:6 orchestra:7 guitar:5 piano:5
cello | object.music | violin:8 orchestra:6
fiddle | object.music | violin:9
drum | object.music | drumstick:8 beat:8 rhythm:8 percussion:9 cymbal:7 drummer:9 band:6 music:5 guitar:5 tambourine:6 thunder:3 bang:5 loud:4
beat | activity.music | rhythm:8 drum:8 tempo:7
rhythm | activity.music | beat:8 drum:8 tempo:7 music:6 dance:5
cymbal | object.music | drum:7 percussion:6
flute | object.music | recorder:8 clarinet:7 whistle:6 pipe:6
trumpet | object.music | horn:7 trombone:8 tuba:7 brass:7 band:4
harp | object.music | angel:4 string:5 lyre:8
music | activity.music | song:8 melody:8 musician:9 band:7 concert:7 rhythm:6 tune:8 sing:6 dance:6 guitar:6 piano:6 note:6 radio:5 orchestra:6 drum:5 album:5 sound:5 symphony:7
song | activity.music | music:8 sing:8 tune:8 melody:8 lyric:8 singer:7 ballad:8 anthem:7 dance:5 chorus:7 album:6 poem:5 radio:4 hum:6 whistle:4
melody | activity.music | tune:9 song:8 music:8 harmony:6
tune | activity.music | melody:9 song:8 music:8
sing | activity.music | song:8 singer:8 choir:7 voice:6 music:6 hum:6 dance:4
singer | person.job | sing:8 song:7 choir:6 voice:5 musician:6
choir | activity.music | sing:7 singer:6 church:4
band | activity.music | music:7 guitar:6 drum:6 concert:6 musician:6 orchestra:6
orchestra | activity.music | symphony:8 violin:7 band:6 conductor:7 concert:6 music:6
concert | activity.music | music:7 show:6 band:6 stage:6 festival:6
musician | person.job | music:9 band:6 singer:6
dance | activity.music | ballet:8 dancer:9 waltz:8 music:6 party:5 disco:7 tango:8 song:5 rhythm:5 sing:4 step:4 spin:4
ballet | activity.music | dance:8 dancer:6 tutu:7
dancer | person.job | dance:9 ballet:6
festival | activity.leisure | party:6 concert:6 carnival:7 celebration:7
celebration | activity.leisure | party:8 festival:7 celebrate:9 cheer:5
celebrate | activity.leisure | celebration:9 party:6 champagne:5

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ CLOTHING & JEWELRY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
clothes | object.clothing.wear | clothing:9 shirt:6 dress:6 wear:7 fashion:6 wardrobe:5
shirt | object.clothing.wear | blouse:8 tshirt:9 sweater:6 jacket:6 button:5 collar:5 pants:6 dress:5
sweater | object.clothing.wear | jumper:9 cardigan:8 wool:7 knit:6 scarf:5 jacket:6 shirt:6
jacket | object.clothing.wear | coat:9 blazer:7 sweater:6 shirt:5
coat | object.clothing.wear | jacket:9 raincoat:7 cloak:7 scarf:5 winter:4 glove:4 hat:4
cloak | object.clothing.wear | cape:8 coat:7 wizard:4
cape | object.clothing.wear | cloak:8 hero:5
dress | object.clothing.wear | skirt:8 gown:9 frock:9 wedding:5 shirt:5 fashion:5
skirt | object.clothing.wear | dress:8 pants:5
pants | object.clothing.wear | trousers:9 jeans:8 shorts:7 skirt:5 shirt:6
jeans | object.clothing.wear | pants:8 denim:9
shorts | object.clothing.wear | pants:7 summer:4
scarf | object.clothing.wear | shawl:8 glove:6 hat:6 winter:5 wool:6 neck:6 coat:5 sweater:5 mitten:5 knit:5 snowman:4 cold:4
glove | object.clothing.wear | mitten:9 hand:7 scarf:6 hat:5 finger:5 baseball:4 boxing:5 winter:4 sock:5 coat:4
mitten | object.clothing.wear | glove:9 scarf:5 winter:4
sock | object.clothing.foot | stocking:8 shoe:7 foot:6 glove:5 boot:4
shoe | object.clothing.foot | boot:8 sneaker:9 sandal:7 sock:7 foot:7 heel:6 slipper:7 lace:7 sole:7 walk:4 leather:4
boot | object.clothing.foot | shoe:8 sandal:5 rain:3 cowboy:4 leather:4 sock:4
sandal | object.clothing.foot | flipflop:9 shoe:7 beach:4 summer:4 slipper:6
slipper | object.clothing.foot | shoe:7 sandal:6 sock:4 cinderella:5
hat | object.clothing.head | cap:9 bonnet:8 helmet:6 beanie:9 sombrero:9 crown:5 head:6 scarf:5 cowboy:5 wizard:4 glove:4 coat:4 hood:6
cap | object.clothing.head | hat:9 helmet:5 lid:4 baseball:5
helmet | object.clothing.head | hat:6 armor:7 knight:5 bike:4 astronaut:5 head:5
hood | object.clothing.head | hat:6 cloak:5
crown | object.jewelry | king:9 queen:9 tiara:9 throne:7 royal:8 prince:6 princess:6 jewel:6 gold:5 kingdom:5 hat:5 diamond:4 castle:4
tiara | object.jewelry | crown:9 princess:7
royal | person.royal | king:8 queen:8 crown:8 palace:6 throne:7 kingdom:6 prince:6
jewel | object.jewelry material.gem | gem:9 diamond:8 ruby:8 emerald:8 sapphire:8 crown:6 treasure:6 ring:6 necklace:6 pearl:6
gem | material.gem | jewel:9 diamond:8 ruby:8 crystal:7 emerald:7
diamond | material.gem object.jewelry | jewel:8 gem:8 ring:7 sparkle:7 ruby:7 emerald:7 sapphire:7 crystal:6 carat:9 hard:4 shiny:5 necklace:5 gold:5 coal:3 pearl:5 treasure:5 rich:4
ruby | material.gem | gem:8 jewel:8 diamond:7 emerald:7 red:5
emerald | material.gem | gem:7 jewel:8 diamond:7 ruby:7 green:5
sapphire | material.gem | gem:7 jewel:8 diamond:7 blue:5
necklace | object.jewelry | pendant:9 chain:5 jewel:6 pearl:7 ring:6 bracelet:7 earring:6 locket:8 neck:5
bracelet | object.jewelry | necklace:7 ring:6 wrist:6 bangle:9
earring | object.jewelry | necklace:6 ring:6 ear:5
glasses | object.clothing.head | spectacles:9 lens:6 sunglasses:7 eye:6 glass:5
sunglasses | object.clothing.head | glasses:7 sun:4 beach:3
sunscreen | object.misc | sunburn:7 beach:6 sun:5 tan:5
sunburn | body.inner | sunscreen:7 sun:5 burn:7 tan:5
towel | object.misc | bath:6 beach:6 shower:5 dry:5
bikini | object.clothing.wear | swimsuit:9 beach:6 swim:5
swimsuit | object.clothing.wear | bikini:9 swim:6 beach:5 pool:5
wool | material.other | sheep:9 knit:7 yarn:8 sweater:7 scarf:6 cotton:5 lamb:5
yarn | material.other | wool:8 knit:7 thread:7 string:7
knit | action.make | wool:7 yarn:7 sweater:6 needle:4 scarf:5
cotton | material.other | wool:5 silk:5 cloud:4 fabric:7
silk | material.other | spider:5 cocoon:5 cotton:5 fabric:6 thread:5 smooth:4
fabric | material.other | cotton:7 cloth:9 silk:6 wool:5
leather | material.other | shoe:4 boot:4 cow:3 wallet:4

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ MATERIALS & COLORS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
metal | material.metal | iron:8 steel:8 gold:6 silver:6 copper:6 tin:6 bronze:6 aluminum:7 magnet:5 robot:3
iron | material.metal | steel:8 metal:8 rust:7 magnet:6 anvil:5
steel | material.metal | iron:8 metal:8 sword:4
copper | material.metal | metal:6 bronze:7 penny:5
bronze | material.metal color.brown | copper:7 medal:6 silver:5 gold:4
gold | material.metal color.yellow | golden:9 silver:7 treasure:8 coin:6 rich:6 medal:7 jewel:5 diamond:5 ring:5 crown:5 money:5 yellow:5 bronze:5 shiny:5 nugget:7 pirate:3 metal:6
golden | color.yellow | gold:9 yellow:6 shiny:4
silver | material.metal color.grey | gold:7 metal:6 coin:5 medal:6 bronze:5 grey:5 shiny:5 moon:3
medal | object.misc | gold:7 trophy:7 silver:6 bronze:6 winner:6
trophy | object.misc | medal:7 cup:5 winner:7 prize:8 champion:7
wood | material.other | timber:9 log:8 lumber:9 tree:7 forest:6 oak:6 plank:7 carpenter:6 fire:4 bark:5 table:3
plank | material.other | wood:7 board:7 pirate:3
plastic | material.other | bottle:5 bag:4 rubber:5
rubber | material.other | tire:6 eraser:6 plastic:5 band:3
color | color | paint:6 rainbow:7 red:6 blue:6 green:6 yellow:6 crayon:5 hue:9
red | color.red | crimson:9 scarlet:9 maroon:8 pink:6 orange:5 blood:6 rose:5 fire:4 color:6 blue:4 ruby:5 cherry:4 apple:3
blue | color.blue | navy:9 azure:9 cyan:8 teal:7 sky:7 ocean:5 sea:5 green:6 purple:6 color:6 red:4 sad:4 water:3 sapphire:5
navy | color.blue | blue:9 sailor:4
teal | color.blue color.green | blue:7 green:7 turquoise:8
turquoise | color.blue | teal:8 blue:6
green | color.green | grass:7 leaf:6 emerald:5 lime:5 jade:7 blue:6 yellow:5 color:6 forest:4 frog:4 plant:4 olive:7 envy:4
yellow | color.yellow | gold:6 lemon:6 banana:6 sun:5 orange:6 green:5 color:6 sunflower:5 golden:6
purple | color.purple | violet:9 lavender:8 lilac:8 plum:5 blue:6 pink:6 grape:4 magenta:7 color:6
violet | color.purple | purple:9 lavender:7
pink | color.red | rose:4 flamingo:6 red:6 purple:6 magenta:6 color:5 candy:3
white | color.white | snow:5 black:6 grey:5 cloud:4 milk:4 ivory:5 pale:6 color:5
black | color.black | dark:7 white:6 night:5 coal:4 grey:5 color:5 shadow:4 crow:3
grey | color.grey | gray:9 silver:5 black:5 white:5 cloud:4 ash:4 smoke:4 fog:4 dull:5
gray | color.grey | grey:9
brown | color.brown | tan:7 chocolate:5 wood:4 beige:6 color:5 bear:3
tan | color.brown | brown:7 beige:7 sun:4 beach:3
dark | quality.other | darkness:9 night:8 black:7 shadow:6 dim:7 gloomy:6 light:6 cave:4
darkness | quality.other | dark:9 night:7 shadow:6
bright | quality.other | light:7 shiny:6 sunny:6 vivid:7 dark:4 sun:5 glow:5 shine:6 clever:4
shine | action.daily | glow:7 bright:6 sparkle:7 shiny:8 light:6 star:4 sun:4
shiny | quality.other | shine:8 sparkle:6 bright:6 gold:4 polished:6
sparkle | action.daily | glitter:9 shine:7 twinkle:8 diamond:6 shiny:6 star:4
twinkle | action.daily | sparkle:8 star:7 shine:5
glitter | object.decoration | sparkle:9 shiny:5 gold:3

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ QUALITIES & ACTIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
wet | quality.other | damp:8 water:7 rain:7 soaked:9 dry:6 moist:8 splash:5 puddle:5
damp | quality.other | wet:8 moist:8 humid:6
humid | quality.other | damp:6 tropical:5 sticky:5 muggy:9
dry | quality.other | arid:9 desert:7 wet:6 drought:7 thirst:5 towel:4
big | quality.size | large:9 huge:8 giant:8 small:6 enormous:8 tall:5
large | quality.size | big:9 huge:7
huge | quality.size | giant:8 enormous:9 big:8 massive:9 large:7 whale:4 elephant:4
giant | quality.size person.fantasy | huge:8 big:8 enormous:7 tall:5 ogre:6
small | quality.size | tiny:8 little:9 big:6 mini:8
tiny | quality.size | small:8 little:8 minute:4 ant:4 mouse:3
tall | quality.size | high:7 giraffe:5 short:6 tower:5 giant:4
high | quality.size | tall:7 low:6 peak:5 sky:4
fast | quality.other | quick:9 speed:8 rapid:9 slow:6 race:6 cheetah:5 run:5
quick | quality.other | fast:9 speed:6
speed | quality.other | fast:8 quick:6 race:6 velocity:9
slow | quality.other | snail:6 turtle:6 tortoise:6 fast:6 lazy:5
loud | quality.other | noisy:9 noise:8 quiet:6 shout:6 thunder:5
noise | quality.other | sound:7 loud:8 quiet:5
sound | quality.other | noise:7 music:5 voice:5 echo:6 hear:7
quiet | quality.other | silent:9 silence:8 calm:6 loud:6 peace:5 whisper:7 library:4
silence | quality.other | quiet:8 silent:9 peace:5
calm | feeling.positive | peaceful:9 relaxed:8 quiet:6 serene:9 tranquil:9 peace:7 storm:4 still:6
soft | quality.other | gentle:6 smooth:6 fluffy:7 hard:6 pillow:4
hard | quality.other | solid:7 difficult:6 soft:6 rock:5 stone:5
old | quality.other | ancient:7 young:6 new:6 elderly:8 antique:8
new | quality.other | fresh:6 old:6 modern:7
fresh | quality.other | new:6 cool:4 breeze:4
clean | quality.other | wash:6 soap:5 tidy:7 dirty:7
wash | action.daily | clean:6 soap:7 bath:6 shower:6 sink:5 laundry:7
soap | object.misc | bubble:7 wash:7 foam:5 bath:5 shampoo:7
bath | place.room object.misc | bathtub:9 shower:7 soap:5 towel:5 bubble:5 water:4 wash:5
bathroom | place.room | toilet:7 bath:6 shower:7 sink:4 mirror:4
bedroom | place.room | bed:8 sleep:4
garage | place.room | car:6 tool:4
attic | place.room | roof:7 dust:4 cellar:5 ghost:3
cellar | place.room | basement:9 attic:5 wine:4
run | action.move | sprint:9 jog:9 race:7 walk:6 marathon:8 jump:5 fast:5 chase:6 running:9
walk | action.move | stroll:9 hike:7 run:6 step:6 march:6 path:4
hike | activity.leisure action.move | walk:7 trail:7 mountain:4 forest:4 camping:5
jump | action.move | leap:9 hop:8 bounce:7 skip:6 run:5 kangaroo:5 frog:4 dive:4
swim | action.move activity.sport | swimming:9 dive:7 pool:8 water:6 float:5 fish:5 ocean:5 lake:4 beach:4 snorkel:6 splash:5 surf:4 swimsuit:6
swimming | activity.sport | swim:9 pool:7 dive:5
dive | action.move activity.sport | swim:7 diving:9 plunge:8 snorkel:7 scuba:8 reef:5 jump:4
diving | activity.sport | dive:9 scuba:8 snorkel:7 reef:6 swim:5 coral:4 pool:5
snorkel | object.misc | dive:7 scuba:7 swim:6 reef:5 mask:5
scuba | activity.sport | dive:8 diving:8 snorkel:7
climb | action.move | ladder:7 mountain:7 cliff:5 rope:4 scramble:7 ascend:9 hike:5 tree:4
float | action.move | swim:5 balloon:6 boat:4 raft:5 drift:7
drift | action.move | float:7 sail:4
sail | action.move vehicle.water | sailboat:9 boat:8 sailor:7 wind:6 ship:7 yacht:7 mast:8 voyage:6 anchor:4 navigate:5 ocean:4
ride | action.move | horse:6 bike:6 drive:6 bicycle:6
drive | action.move | car:8 ride:6 road:5 truck:4 taxi:4
throw | action.move | catch:7 ball:6 toss:9
catch | action.move | throw:7 ball:5 fishing:4
dig | action.make | shovel:8 spade:7 hole:7 dirt:4 bury:6
build | action.make | construct:9 make:7 hammer:6 house:4 builder:8 tower:4
grow | action.make | plant:8 seed:7 sprout:7 tree:5 garden:5
think | action.daily | idea:7 brain:7 mind:7 reflect:5 wonder:6
idea | feeling.mind | think:7 thought:9 bulb:5 plan:6 brain:5
brain | body.inner | mind:8 think:7 head:6 smart:6 idea:5 skull:5
mind | feeling.mind | brain:8 think:7 thought:7 memory:6
memory | feeling.mind | remember:9 past:6 mind:6 nostalgia:7 forget:6 brain:5 photo:4 dream:4 elephant:3
remember | feeling.mind | memory:9 forget:7
wish | feeling.mind | hope:7 dream:6 star:5 genie:6 desire:7
hope | feeling.positive | wish:7 dream:6 faith:6 optimism:8 despair:6
magic | person.fantasy | wizard:8 spell:8 witch:7 wand:8 potion:6 trick:6 fairy:6 unicorn:5 rabbit:3 mystery:4 sorcery:9
spell | person.fantasy activity.study | magic:8 wizard:7 witch:7 potion:6 wand:7 word:5
wand | person.fantasy | magic:8 wizard:8 spell:7 fairy:5 witch:6
potion | person.fantasy | magic:6 witch:6 cauldron:7 spell:6 wizard:5 poison:4
fairy | person.fantasy | magic:6 elf:7 wing:4 tale:5 pixie:9 wand:5 toadstool:3
elf | person.fantasy | fairy:7 dwarf:6 santa:5
mystery | feeling.mind | puzzle:5 riddle:6 secret:7 detective:7 clue:8
secret | feeling.mind | mystery:7 hidden:7 diary:4 key:4 whisper:5
clue | feeling.mind | mystery:8 detective:7 hint:8
detective | person.job | mystery:7 clue:7 police:6 spy:5
love | feeling.positive | heart:8 romance:8 affection:9 hug:7 kiss:7 rose:5 valentine:7 wedding:5 friend:4 hate:6 passion:7 family:4
heart | body.inner feeling.positive | love:8 beat:6 blood:6 pulse:8 chest:5 valentine:7 organ:6 brain:5 romance:5 lung:5 kindness:4
valentine | activity.leisure | love:7 heart:7 rose:6 romance:6
romance | feeling.positive | love:8 romantic:9 rose:5 kiss:5
kiss | action.daily | love:7 hug:7 romance:5
hug | action.daily | kiss:7 love:7 embrace:9 cuddle:8
friend | person.family | buddy:9 pal:9 companion:8 family:4 love:4 neighbor:5
happy | feeling.positive | joy:9 glad:9 cheerful:9 smile:7 sad:6 laugh:6 fun:5 delight:8
joy | feeling.positive | happy:9 delight:8 happiness:9 smile:6 laugh:6
happiness | feeling.positive | joy:9 happy:9
smile | action.daily | happy:7 laugh:7 grin:9 joy:6 face:4
laugh | action.daily | giggle:9 smile:7 joke:7 happy:6 funny:7
fun | feeling.positive | play:6 happy:5 game:5 party:4 enjoy:7
sad | feeling.negative | unhappy:9 sorrow:9 cry:8 tear:7 lonely:6 happy:6 gloomy:7 blue:4 grief:8
cry | action.daily | tear:8 sad:8 weep:9 sob:9 onion:3
tear | body.inner | cry:8 sad:6 rip:5 drop:4 onion:4
fear | feeling.negative | scared:9 afraid:9 terror:9 fright:9 panic:7 nightmare:6 ghost:5 brave:5 shiver:4 monster:4
scared | feeling.negative | fear:9 afraid:9 frightened:9
afraid | feeling.negative | fear:9 scared:9
angry | feeling.negative | anger:9 mad:9 rage:8 furious:9 shout:5
anger | feeling.negative | angry:9 rage:8 fury:8
lonely | feeling.negative | alone:8 sad:6 isolated:7
alone | feeling.negative | lonely:8 isolated:6
isolated | quality.other | lonely:7 alone:6 island:5
peace | feeling.positive | calm:7 quiet:5 dove:7 war:6 harmony:7 serene:6
brave | feeling.positive | courage:9 hero:7 bold:8 fear:5 knight:5
hero | person.fantasy | brave:7 superhero:9 legend:5 villain:7 knight:5 cape:5
luck | feeling.positive | fortune:8 chance:7 lucky:9 dice:5 clover:7
wisdom | feeling.mind | wise:9 owl:6 knowledge:7

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ PEOPLE & BODY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
person | person.family | human:9 people:9 man:6 woman:6
man | person.family | woman:7 boy:6 person:6 gentleman:8
woman | person.family | man:7 girl:6 person:6 lady:8
baby | person.age | infant:9 newborn:9 toddler:8 child:7 crib:6 cradle:6 diaper:7 cry:4 bottle:3 mother:5 pram:6
child | person.age | kid:9 boy:7 girl:7 baby:7 toddler:6 school:4 toy:5 parent:6
kid | person.age | child:9 boy:6 girl:6
boy | person.age | girl:7 child:7 son:7 man:6
girl | person.age | boy:7 child:7 daughter:7 woman:6
family | person.family | parent:7 mother:7 father:7 sibling:7 home:5 child:5 brother:6 sister:6
mother | person.family | mom:9 mum:9 father:8 parent:8 baby:5 family:7
father | person.family | dad:9 mother:8 parent:8 family:7
parent | person.family | mother:8 father:8 family:7 child:6
brother | person.family | sister:8 sibling:9 family:6
sister | person.family | brother:8 sibling:9 family:6
king | person.royal | queen:8 crown:9 throne:8 royal:8 kingdom:8 prince:7 monarch:9 castle:6 palace:6 knight:6 emperor:8 lion:4 chess:4 ruler:8 princess:5 jester:5 sceptre:6
queen | person.royal | king:8 crown:9 throne:7 royal:8 princess:7 bee:4 palace:6 monarch:8 kingdom:6 chess:4 empress:8
prince | person.royal | princess:8 king:7 royal:6 castle:4 frog:3 crown:6
princess | person.royal | prince:8 queen:7 castle:5 tiara:7 crown:6 fairy:3
kingdom | place.urban | king:8 realm:9 castle:6 royal:6 empire:7
emperor | person.royal | king:8 empire:8
knight | person.royal person.job | armor:8 sword:8 shield:7 castle:7 king:6 horse:4 dragon:6 lance:7 hero:5 chess:4 helmet:5 squire:8
armor | object.weapon | knight:8 shield:7 helmet:7
shield | object.weapon | sword:7 armor:7 knight:7 protect:7
sword | object.weapon | blade:8 knight:8 shield:7 dagger:7 knife:6 pirate:5 armor:5 steel:4
blade | object.weapon | sword:8 knife:8 sharp:6
dagger | object.weapon | knife:7 sword:7
cannon | object.weapon | pirate:5 ship:4 castle:4 gun:6
bow | object.weapon object.misc | arrow:9 archer:8 violin:4 ribbon:5
arrow | object.weapon | bow:9 target:7 archer:7 point:5 direction:3
pirate | person.adventure | treasure:7 ship:7 parrot:6 captain:7 sword:5 cannon:5 island:5 plunder:7 sail:5 skull:5 flag:4 eyepatch:8 buccaneer:9 rum:6 plank:3 anchor:4 sailor:6 map:3 ocean:3 kraken:4
buccaneer | person.adventure | pirate:9
captain | person.job | pirate:7 ship:7 sailor:7 boat:5 pilot:5
sailor | person.job | ship:8 boat:7 sail:7 navy:4 captain:7 pirate:6 sea:5 anchor:5 ocean:4 harbor:5
explorer | person.adventure | explore:9 adventure:8 map:5 compass:5 travel:5
explore | action.move | explorer:9 adventure:7 discover:7 map:5 compass:5
adventure | activity.leisure | explore:7 explorer:8 journey:7 quest:8 travel:5 treasure:3
travel | activity.leisure | journey:8 trip:8 tourist:7 vacation:7 holiday:6 suitcase:6 passport:7 explore:5
journey | activity.leisure | travel:8 trip:7 voyage:8 adventure:7
voyage | activity.leisure | journey:8 sail:6 ship:6 cruise:7
vacation | activity.leisure | holiday:9 travel:7 beach:6 summer:6 trip:6 resort:7
holiday | activity.leisure | vacation:9 beach:6 travel:6 summer:6 christmas:4
camping | activity.leisure | tent:8 campfire:8 hike:5 forest:4 sleeping:3 lantern:4
doctor | person.job | nurse:8 hospital:8 physician:9 medicine:7 patient:7 surgeon:8 stethoscope:8 sick:6 clinic:8 health:6 dentist:6 cure:5 vet:5
nurse | person.job | doctor:8 hospital:7 patient:6 medicine:5
dentist | person.job | tooth:8 doctor:6
hospital | place.building.public | doctor:8 nurse:7 patient:7 clinic:8 ambulance:7 sick:6 surgery:6 medicine:6 health:5 ward:6 emergency:6
medicine | object.misc | pill:8 doctor:7 cure:7 drug:7 hospital:6 sick:5 potion:3
sick | quality.other | ill:9 fever:7 doctor:6 hospital:6 cough:6
fever | body.inner | sick:7 temperature:5 cold:3 hot:3
teacher | person.job | school:8 student:8 classroom:8 lesson:7 professor:7 tutor:8 apple:3
school | place.building.public | teacher:8 student:8 class:8 classroom:9 lesson:7 college:7 homework:7 library:3 university:6
student | person.job | school:8 teacher:8 study:7 pupil:9
study | activity.study | learn:8 school:6 homework:6 student:7 library:4
farmer | person.job | farm:9 tractor:6 crop:6 harvest:6 barn:5 cow:4
firefighter | person.job | fire:6 truck:4 hose:6 rescue:5
police | person.job | officer:8 detective:6 siren:5
pilot | person.job | plane:8 airplane:8 fly:5 cockpit:8 captain:5 airport:5 astronaut:4
soldier | person.job | army:9 war:7 knight:4
wizard | person.fantasy | magic:8 wand:8 sorcerer:9 witch:7 spell:7 merlin:9 potion:5 robe:5 hat:4 staff:5 dragon:3 castle:3 owl:3 warlock:8 mage:9
sorcerer | person.fantasy | wizard:9 magic:8 mage:8
witch | person.fantasy | wizard:7 broom:6 cauldron:7 magic:7 spell:7 potion:6 halloween:6 hat:4 cat:3
ghost | person.fantasy | spirit:9 phantom:9 haunted:8 spooky:8 boo:7 halloween:6 vampire:5 skeleton:5 ghoul:8 sheet:4 monster:5 dead:4 graveyard:6 invisible:4 attic:3
spirit | person.fantasy | ghost:9 soul:8 phantom:8
phantom | person.fantasy | ghost:9 spirit:8
haunted | quality.other | ghost:8 spooky:7 castle:3 mansion:5
spooky | quality.other | ghost:8 creepy:8 haunted:7 halloween:6
halloween | activity.leisure | pumpkin:8 ghost:6 costume:7 witch:6 spooky:6 candy:4 bat:4 vampire:5 skeleton:5 october:7
skeleton | body.inner | bone:8 skull:8 ghost:5 halloween:5
skull | body.inner | skeleton:8 bone:7 head:6 pirate:4
monster | person.fantasy | beast:7 creature:5 ghost:5 dragon:4 kraken:6 nightmare:5 vampire:4
mermaid | person.fantasy | sea:5 ocean:5 fish:4 siren:6 tail:4
santa | person.fantasy | christmas:9 reindeer:7 sleigh:7 elf:5 gift:5 chimney:5
christmas | activity.leisure | santa:9 december:7 tree:4 gift:6 snow:4 winter:6 reindeer:5 sleigh:5 pine:4
body | body.part | head:5 arm:5 leg:5 skin:5
head | body.part | face:7 brain:6 hair:6 skull:6 neck:6 hat:6 eye:4
face | body.part | head:7 eye:6 nose:6 mouth:6 smile:4 cheek:7
eye | body.part | see:8 vision:8 sight:8 eyelash:9 pupil:7 eyebrow:8 tear:5 ear:5 nose:5 face:6 glasses:6 blink:8 look:5
see | action.daily | look:9 watch:7 eye:8 vision:6
look | action.daily | see:9 watch:6 eye:5
vision | body.inner | sight:9 eye:8 see:6 dream:5
ear | body.part | hear:8 listen:8 sound:5 eye:5 nose:5 earring:5
hear | action.daily | listen:9 ear:8 sound:7
nose | body.part | smell:8 sniff:8 face:6 mouth:5 eye:5 ear:5
smell | action.daily | nose:8 scent:9 sniff:7 odor:9
mouth | body.part | lip:8 tooth:7 tongue:8 kiss:4 jaws:5 face:6 nose:5 eat:4
tooth | body.part | teeth:9 dentist:8 molar:9 fang:7 toothbrush:8 bite:7 mouth:7 tusk:4 smile:4 gum:5 jaws:4 chew:6 enamel:7
teeth | body.part | tooth:9
toothbrush | object.misc | tooth:8 toothpaste:9 brush:6
bite | action.daily | tooth:7 chew:7 bite:2 jaws:6 eat:6 shark:5 mosquito:5
chew | action.daily | bite:7 gum:6 eat:7 tooth:5
hand | body.part | finger:8 palm:7 thumb:8 wrist:7 arm:7 fist:7 glove:6 foot:6 grip:7 wave:3 clap:6 nail:4
finger | body.part | thumb:8 hand:8 nail:5 ring:5 toe:6
thumb | body.part | finger:8 hand:7
wrist | body.part | hand:7 watch:6 bracelet:5 arm:6
arm | body.part | elbow:8 hand:7 leg:6 shoulder:7 muscle:5 wrist:6
leg | body.part | knee:8 foot:7 arm:6 thigh:8
foot | body.part | toe:8 heel:7 shoe:6 leg:7 hand:6 ankle:8 sock:5 walk:4
toe | body.part | foot:8 finger:6
hair | body.part | curl:6 comb:7 brush:5 beard:6 head:5 bald:5 mane:5 wig:7 haircut:8
neck | body.part | throat:8 head:5 scarf:5 giraffe:5
skin | body.part | tan:4 flesh:7 body:5 sunburn:5
bone | body.inner | skeleton:8 skull:7 dog:6 fossil:5 joint:6 marrow:7 rib:7 calcium:6
blood | body.inner | vein:8 heart:6 red:5 vampire:6 bleed:8 wound:6
lung | body.inner | breath:7 heart:5 breathe:7
breath | body.inner | breathe:9 air:6 lung:7 blow:5
breathe | action.daily | breath:9 air:7 lung:7
stomach | body.inner | belly:9 hungry:5 tummy:9

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ PLACES & BUILDINGS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
house | place.building.home | home:9 cottage:7 building:6 roof:5 door:4 mansion:7 cabin:6 hut:5 apartment:6 family:3 garden:4 chimney:3
home | place.building.home | house:9 family:5 cozy:4
cottage | place.building.home | cabin:8 house:7 hut:6 village:4
cabin | place.building.home | cottage:8 hut:8 log:5 shack:7 woods:4 lodge:7
hut | place.building.home | shack:9 cabin:8 shed:7 cottage:6 thatch:7 tent:5 house:5 beach:4 straw:3 igloo:4 shelter:6
shack | place.building.home | hut:9 cabin:7 shed:7
shed | place.building.home | shack:7 hut:7 garden:4 tool:4 barn:5
shelter | place.building.home | hut:6 tent:6 roof:5 refuge:8
thatch | material.other | hut:7 roof:6 straw:6
tent | place.building.home | camping:8 hut:5 shelter:6 campfire:5 circus:5 igloo:4
igloo | place.building.home | ice:5 snow:5 eskimo:5 hut:4 tent:4 polar:4
mansion | place.building.home | house:7 palace:6 rich:5
apartment | place.building.home | flat:9 house:6 building:5
building | place.building.public | house:6 tower:5 skyscraper:7
castle | place.building.grand | fortress:9 palace:8 tower:7 moat:9 knight:7 king:6 drawbridge:9 throne:4 kingdom:6 queen:4 princess:5 dragon:5 wall:4 sandcastle:6 turret:8 dungeon:7 ruins:4 chateau:9
palace | place.building.grand | castle:8 king:6 queen:6 mansion:6 royal:6 throne:5
fortress | place.building.grand | castle:9 fort:9 wall:5
dungeon | place.building.grand | castle:7 prison:7 dragon:3
moat | place.building.grand | castle:9 drawbridge:6
tower | place.building.tower | castle:7 skyscraper:7 turret:8 spire:7 lighthouse:6 tall:5 bell:4 clock:3 high:4 rapunzel:5
skyscraper | place.building.tower | tower:7 city:6 building:7 tall:5
lighthouse | place.building.tower | beacon:9 lamp:5 light:5 lantern:4 coast:6 tower:6 ship:5 shipwreck:5 harbor:6 keeper:6 rock:3 fog:4 cliff:4 sailor:4 beam:6 sea:5 storm:3
beacon | object.light | lighthouse:9 signal:6 light:5 fire:3
windmill | place.building.tower | wind:7 mill:9 farm:5 tower:4 holland:5
church | place.building.public | chapel:9 cathedral:9 temple:6 bell:5 priest:7 pray:6
temple | place.building.public | church:6 shrine:8 ancient:5 pray:5
museum | place.building.public | gallery:8 art:6 history:6 exhibit:9 dinosaur:4 painting:5 library:4
gallery | place.building.public | museum:8 art:7 painting:5
prison | place.building.public | jail:9 dungeon:7 cell:7
hotel | place.building.public | motel:9 inn:9 resort:7 room:5 holiday:4
shop | place.building.public | store:9 market:7 buy:7 shopping:9 mall:7 bakery:4
market | place.urban | shop:7 bazaar:9 store:6 stall:7
farm | place.building.farm place.rural | barn:8 farmer:9 tractor:7 cow:7 field:6 crop:7 harvest:7 pig:6 sheep:6 chicken:6 ranch:7 orchard:5 hay:5 horse:5 goat:4 scarecrow:5
barn | place.building.farm | farm:8 hay:6 cow:6 horse:4 stable:7 shed:5
stable | place.building.farm | horse:7 barn:7
harvest | activity.leisure | crop:8 farm:7 autumn:7 wheat:5 farmer:6 pumpkin:5
crop | nature.plant.other | harvest:8 farm:7 field:6 wheat:5 farmer:6
tractor | vehicle.land | farm:7 farmer:6 field:4 truck:5
garden | place.outdoor | flower:7 yard:8 plant:7 lawn:6 vegetable:4 gardener:8 shed:4 rose:5 park:6 fence:4 bee:3 soil:5 seed:5 orchard:5 greenhouse:8 butterfly:3
yard | place.outdoor | garden:8 lawn:6 backyard:9
park | place.outdoor | garden:6 playground:7 bench:5 tree:3 picnic:6 lawn:5
playground | place.outdoor | park:7 swing:7 slide:7 child:4
city | place.urban | town:8 urban:9 metropolis:9 street:6 skyscraper:6 village:6 capital:7 traffic:5 downtown:8
town | place.urban | city:8 village:8 street:5
village | place.urban | town:8 hamlet:9 city:6 cottage:4
street | place.urban | road:9 avenue:9 city:6 lane:8 sidewalk:7
road | place.urban | street:9 highway:9 path:6 car:5 bridge:4 map:4 route:6 drive:5
path | place.urban | trail:9 road:6 route:6 walk:4
trail | place.urban | path:9 hike:7 route:5
route | place.urban | road:6 path:6 map:7 direction:5
bridge | place.urban | river:6 crossing:7 arch:6 road:4 tunnel:5 canal:4 ferry:3 pier:3
tunnel | place.urban | cave:6 underground:6 bridge:5 train:4
underground | place.urban | tunnel:6 cave:7 subway:7 root:3
harbor | place.transport | port:9 dock:8 pier:7 marina:9 boat:6 ship:6 bay:7 sailor:5 lighthouse:6 anchor:5 coast:6
port | place.transport | harbor:9 dock:8 ship:6
dock | place.transport | pier:8 harbor:8 port:8 wharf:9 boat:5
pier | place.transport | jetty:9 dock:8 wharf:8 harbor:7 beach:5 boat:4
airport | place.transport | plane:8 flight:7 runway:9 pilot:5 terminal:6 travel:5
station | place.transport | train:8 platform:7 railway:7
shipwreck | object.misc | ship:7 wreck:9 treasure:5 sink:4 storm:4 pirate:4 lighthouse:5 island:4

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ VEHICLES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
vehicle | vehicle.land | car:7 truck:6 bus:5
car | vehicle.land | automobile:9 vehicle:7 truck:7 drive:8 taxi:7 wheel:7 road:5 engine:6 bus:6 garage:5 motorcycle:6 tire:6 van:7
automobile | vehicle.land | car:9
truck | vehicle.land | lorry:9 van:7 car:7 bus:5 tractor:5
van | vehicle.land | truck:7 car:7 bus:5
bus | vehicle.land | coach:8 car:6 taxi:5 train:6 truck:5 tram:6
taxi | vehicle.land | cab:9 car:7 bus:5
wheel | object.tool | tire:8 car:7 bicycle:6 spin:5 wagon:5
tire | object.tool | wheel:8 car:6 rubber:6
train | vehicle.land | railway:9 locomotive:9 rail:8 track:7 station:8 subway:7 tram:7 carriage:6 bus:6 steam:4 tunnel:4 conductor:6 car:4
subway | vehicle.land | metro:9 train:7 underground:7 tram:5
tram | vehicle.land | train:7 bus:6 trolley:8
carriage | vehicle.land | horse:6 coach:6 wagon:7 train:6 pumpkin:3
wagon | vehicle.land | cart:8 carriage:7 wheel:5
cart | vehicle.land | wagon:8 trolley:6
bicycle | vehicle.land | bike:9 cycle:9 pedal:8 wheel:6 helmet:5 motorcycle:7 tricycle:8 ride:6 chain:4 cyclist:9 race:3 scooter:6
bike | vehicle.land | bicycle:9 motorcycle:7 pedal:6 ride:5
motorcycle | vehicle.land | motorbike:9 bike:7 bicycle:7 scooter:7 car:6 helmet:5
scooter | vehicle.land | motorcycle:7 bicycle:6 moped:9
plane | vehicle.air | airplane:9 aircraft:9 jet:9 pilot:8 airport:8 fly:6 wing:5 helicopter:7 flight:8 rocket:5 glider:7
airplane | vehicle.air | plane:9 jet:8 flight:7
jet | vehicle.air | plane:9 airplane:8 rocket:5
helicopter | vehicle.air | chopper:9 plane:7 rotor:8 pilot:5
glide | action.move | soar:7 fly:6 float:5
rocket | vehicle.space | spaceship:9 spacecraft:9 launch:8 space:7 astronaut:8 moon:5 nasa:7 shuttle:8 missile:7 orbit:5 jet:5 planet:4 star:3 plane:5 firework:5 blast:6 satellite:5
spaceship | vehicle.space | rocket:9 spacecraft:9 alien:5 space:6 ufo:6
satellite | vehicle.space | orbit:7 space:6 rocket:5 moon:4
firework | object.misc | rocket:5 explode:5 spark:6 celebration:6 night:3 festival:5
boat | vehicle.water | ship:8 canoe:7 sail:8 sailboat:8 yacht:7 raft:6 row:7 harbor:6 anchor:6 dock:5 ferry:7 fishing:5 kayak:7 sea:5 river:5 lake:5 oar:7 captain:5 sailor:6 vessel:9 dinghy:9
ship | vehicle.water | boat:8 vessel:9 sail:7 sailor:8 captain:7 anchor:7 harbor:6 cruise:7 port:6 ocean:5 sea:6 pirate:6 shipwreck:7 voyage:6 navy:5 ferry:6 deck:6 mast:6 titanic:7
vessel | vehicle.water | ship:9 boat:9
canoe | vehicle.water | kayak:9 boat:7 paddle:8 raft:6 river:6 lake:5 oar:5
kayak | vehicle.water | canoe:9 paddle:7 boat:7
raft | vehicle.water | boat:6 float:5 canoe:6
sailboat | vehicle.water | sail:9 boat:8 yacht:8
yacht | vehicle.water | sailboat:8 boat:7 ship:6 luxury:5
ferry | vehicle.water | boat:7 ship:6 harbor:4
submarine | vehicle.water | underwater:8 sub:9 periscope:9 ocean:5 dive:5 ship:5 navy:5
underwater | quality.other | submarine:8 ocean:5 dive:6 scuba:6
anchor | object.boatpart | ship:7 boat:6 harbor:5 chain:5 sailor:5 dock:4 sea:4 heavy:4 pirate:4 rope:3 tattoo:4 port:4 ocean:4
oar | object.boatpart | paddle:9 row:8 boat:7 canoe:5
paddle | object.boatpart | oar:9 canoe:8 kayak:7 row:6
row | action.move | oar:8 boat:7 paddle:6 line:5
mast | object.boatpart | sail:8 ship:6 flag:4
deck | object.boatpart | ship:6 card:4 boat:5
surfboard | object.toy activity.sport | surf:9 wave:6 beach:6 board:5 surfing:8
surfing | activity.sport | surf:9 surfboard:8 wave:7 beach:6
fishing | activity.leisure | fish:8 rod:9 hook:8 bait:9 net:7 boat:5 lake:4 river:4 angler:9
hook | object.tool | fishing:8 fish:5 pirate:5 bait:6
net | object.tool | fishing:7 fish:6 web:5 trap:5 tennis:4 goal:4
sport | activity.sport | game:6 football:7 tennis:6 athlete:8 team:7 ball:5 race:5 soccer:7 golf:5
football | activity.sport | soccer:9 ball:7 goal:7 team:6 stadium:7 sport:7 rugby:7
soccer | activity.sport | football:9 goal:7 ball:6
tennis | activity.sport | racket:8 ball:6 court:7 badminton:7 sport:6 net:4
golf | activity.sport | club:7 ball:5 sport:5
baseball | activity.sport | bat:7 ball:6 glove:5 sport:6
basketball | activity.sport | hoop:8 ball:7 sport:6
race | activity.sport | run:7 fast:6 speed:6 marathon:7 winner:6 car:4 horse:4
ski | activity.sport | snow:7 slope:7 mountain:5 skiing:9 snowboard:8
skate | activity.sport | ice:6 skateboard:7 rink:8
boxing | activity.sport | glove:5 punch:8 fight:6
winner | person.job | champion:9 trophy:7 medal:6 victory:8 prize:6
victory | feeling.positive | win:9 winner:8 triumph:9 success:7

# â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ENRICHMENT FOR ANSWER WORDS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
dinosaur | animal.reptile | lizard:5 dragon:5 mammoth:5 bone:6 museum:5 roar:5 skeleton:6 crocodile:5 meteor:5 ancient:6 giant:5 claw:4 egg:4
key | object.tool | chain:5 password:6 secret:5 code:6 gate:5 safe:7 keychain:9 open:5 house:4
safe | object.container | vault:8 lock:7 key:7 money:5 secure:7
phone | object.tech | message:6 email:5 screen:6 app:7 tablet:7 laptop:6 radio:5 selfie:5 battery:5
tablet | object.tech | laptop:6 computer:7 phone:7 screen:6
robot | object.tech | computer:6 metal:5 future:5 machine:8 gear:5 laser:4 alien:4 toy:4 engine:4
bell | object.music | alarm:6 clock:5 whistle:5 sleigh:4 tower:5 drum:5 christmas:4 cymbal:5 horn:5 school:4
whistle | object.music | bell:5 flute:6 referee:6 wind:4
ladder | object.tool | roof:5 firefighter:5 tree:4 high:5 tall:4 stairs:7 rope:5
rope | object.tool | chain:6 ladder:5 climb:5 sail:4 anchor:4 swing:5 thread:5 tie:7 net:5 cowboy:4 pull:5 string:7
swing | object.toy | playground:7 rope:5 tree:3 slide:6
slide | object.toy | playground:7 swing:6
balloon | object.toy | bubble:5 kite:5 zeppelin:6 basket:4 sky:4 confetti:5 string:5 float:6
confetti | object.decoration | party:7 celebration:6 balloon:5
puzzle | object.toy | clue:6 crossword:9 maze:7 solve:8 brain:5 sudoku:9 toy:5 problem:6 game:6
maze | object.toy | labyrinth:9 puzzle:7 path:4
bridge | place.urban | river:7 canal:5 ferry:4 cross:6 pier:4 tower:4 railway:4 water:4 gap:5 road:6 street:5 train:4 dock:4 crossing:7
canal | nature.water.fresh | river:6 boat:5 bridge:5
city | place.urban | building:6 traffic:6 street:6 road:5 market:4 bus:5 subway:5 park:4 tower:5 skyscraper:6
traffic | place.urban | car:6 road:6 city:6 jam:3
teacher | person.job | homework:6 chalk:7 blackboard:8 pupil:6 class:7 learn:7 study:6 education:8 book:4 classroom:8 professor:7 tutor:8
professor | person.job | teacher:7 university:7 student:5
tutor | person.job | teacher:8 student:6 lesson:6
classroom | place.room | school:9 teacher:8 desk:5 lesson:6 student:6
lesson | activity.study | teacher:7 school:7 class:6 learn:6
learn | activity.study | study:8 school:6 teacher:7 lesson:6 student:5
baby | person.age | mother:6 cry:5 bottle:5 rattle:7 born:7 cute:6 young:6 kid:6 nursery:7 lullaby:7 parent:5 doll:4 crib:6
crib | object.furniture | baby:7 cradle:8 bed:7
cradle | object.furniture | crib:8 baby:6
dragon | person.fantasy animal.myth | fire:6 wing:6 lizard:5 dinosaur:5 serpent:5 monster:6 scale:5 cave:5 princess:4 legend:6 magic:5 wizard:5 claw:4 knight:6
hair | body.part | head:6 brush:6 shampoo:7 mane:6 blonde:8 fur:8 bald:6 braid:8 ponytail:8 scissors:5 barber:8 hairdresser:8 comb:7
fur | body.part | hair:8 coat:4 bear:4 fox:4 wool:5
comb | object.misc | hair:7 brush:6
barber | person.job | hair:8 haircut:8 scissors:6
memory | feeling.mind | recall:8 photo:5 history:4 dream:5 souvenir:6 diary:5 childhood:6 album:5 think:5 moment:5 remember:9 forget:6
forget | feeling.mind | remember:7 memory:6
album | object.paper | photo:6 music:5 song:6 memory:5
fear | feeling.negative | horror:8 dread:8 anxiety:7 phobia:8 scream:7 monster:5 dark:5 spider:4 courage:5 nightmare:6
horror | feeling.negative | fear:8 scary:7 monster:5 ghost:4
scream | action.daily | fear:7 shout:7 horror:6
shout | action.daily | yell:9 scream:7 loud:6
football | activity.sport | kick:8 referee:7 player:7 match:6 field:5 tennis:4 basketball:5 baseball:5 goal:7 team:6 stadium:7 sport:7 coach:5
kick | action.move | football:8 soccer:6 ball:5
team | activity.sport | player:7 football:6 coach:6 sport:7
goal | activity.sport | football:7 soccer:7 net:5 score:6 dream:3

# ───────────── EXPANSION · FANTASY, MYTH & HISTORY ─────────────
genie | person.fantasy | lamp:7 wish:9 bottle:5 magic:7 desert:3 carpet:5 spell:4
goblin | person.fantasy | troll:8 ogre:7 elf:5 monster:6 gold:3 cave:4 fairy:3
troll | person.fantasy | goblin:8 ogre:8 bridge:6 monster:6 giant:5 cave:4
ogre | person.fantasy | troll:8 giant:7 goblin:7 monster:6 swamp:4
phoenix | animal.myth person.fantasy | fire:7 bird:6 ash:7 flame:6 rebirth:8 dragon:5 feather:5 myth:6 legend:5 unicorn:4 griffin:5
griffin | animal.myth | eagle:6 lion:6 wing:5 myth:6 dragon:5 unicorn:4
sphinx | animal.myth place.building.grand | pyramid:8 egypt:8 riddle:7 lion:5 pharaoh:6 desert:5 myth:5 ancient:5
pharaoh | person.royal | pyramid:9 egypt:9 mummy:7 tomb:7 king:6 sphinx:6 emperor:5 ancient:6 throne:4
egypt | place.urban | pyramid:8 pharaoh:9 desert:5 mummy:6 sphinx:8 nile:8 ancient:6
nile | nature.water.fresh | river:8 egypt:8
mummy | person.fantasy | pyramid:8 tomb:8 egypt:7 pharaoh:7 bandage:7 ancient:5 halloween:4 curse:5 zombie:5 mother:3
zombie | person.fantasy | undead:9 monster:6 mummy:5 vampire:5 ghost:4 halloween:5 skeleton:4 brain:4 graveyard:5
curse | person.fantasy | spell:6 witch:5 mummy:5 magic:5
superhero | person.fantasy | hero:9 cape:7 villain:7 power:5 mask:5 comic:6 strong:4
villain | person.fantasy | hero:7 superhero:7 evil:8 monster:4 wicked:6
evil | quality.other | villain:8 wicked:9 witch:4 monster:4 good:5
mermaid | person.fantasy | sea:6 ocean:6 fish:5 siren:7 tail:5 shell:4 pearl:4 sailor:4 kraken:4 lagoon:4 legend:4 myth:5 seahorse:4
kraken | person.fantasy animal.myth | octopus:8 squid:7 tentacle:7 sea:5 monster:6 pirate:5 legend:5 ship:4 myth:5
cauldron | object.kitchen | pot:6 witch:8 potion:8 brew:6 magic:5 halloween:4 spell:4 bubble:4
potion | person.fantasy | magic:6 witch:6 cauldron:8 spell:6 wizard:5 poison:4 bottle:5 brew:6 elixir:9 alchemy:7
alchemy | person.fantasy | potion:7 gold:5 wizard:5 chemistry:5
viking | person.adventure | ship:6 sword:5 axe:6 helmet:6 warrior:7 raid:6 shield:5 pirate:5 sail:4
samurai | person.adventure | sword:8 ninja:8 japan:7 warrior:8 armor:6 knight:6 honor:5
ninja | person.adventure | samurai:8 japan:6 sword:5 stealth:7 shadow:5 spy:5 warrior:5 mask:4
warrior | person.adventure | soldier:7 knight:7 fight:6 battle:8 sword:6 samurai:7 viking:6 hero:5 brave:5 shield:5
gladiator | person.adventure | arena:8 rome:7 sword:6 warrior:7 fight:6 shield:5
battle | activity.conflict | war:9 fight:8 warrior:7 army:7 soldier:7 sword:5 victory:5 shield:4
war | activity.conflict | battle:9 army:8 soldier:7 peace:6 fight:6 weapon:5
fight | activity.conflict | battle:8 punch:7 boxing:6 war:6 argue:5
army | activity.conflict person.job | soldier:9 war:8 battle:7 navy:6 general:6 tank:5
armor | object.weapon | knight:8 shield:7 helmet:7 sword:5 metal:5 battle:5 steel:4 warrior:5 samurai:5
cannon | object.weapon | pirate:6 ship:5 castle:5 gun:6 cannonball:9 boom:5 explode:5 battle:5 war:5
gun | object.weapon | cannon:6 bullet:8 rifle:9 pistol:9 shoot:8
jester | person.royal | clown:7 king:5 joke:6 castle:4

# ───────────── EXPANSION · SCIENCE & MYSTERY ─────────────
science | activity.study | scientist:9 experiment:8 laboratory:8 chemistry:8 physics:8 biology:8 microscope:6 atom:6 research:7
scientist | person.job | science:9 laboratory:8 experiment:8 microscope:6 inventor:6 professor:5 research:6
laboratory | place.building.public | science:8 scientist:8 experiment:8 microscope:6 chemistry:6
experiment | activity.study | science:8 laboratory:8 scientist:8 test:6 chemistry:5
chemistry | activity.study | science:8 atom:6 laboratory:6 molecule:7 potion:3
physics | activity.study | science:8 gravity:7 atom:6 energy:6
biology | activity.study | science:8 cell:6 animal:4 plant:4
atom | activity.study | molecule:8 electron:8 science:6 nucleus:7 tiny:4 physics:6
molecule | activity.study | atom:8 chemistry:7
electricity | object.tech | electric:9 lightning:7 power:7 battery:6 wire:7 spark:5 energy:7 current:7
electric | object.tech | electricity:9 lightning:7 eel:5 spark:5 power:6
energy | object.tech | power:8 electricity:7 battery:5 solar:6 fuel:6
power | object.tech | energy:8 electricity:7 strong:6 battery:6
wire | object.tech | cable:9 electricity:7 metal:4
magnet | object.tool | iron:7 metal:6 fridge:5 north:4 compass:7 attract:7 pole:4
inventor | person.job | invention:9 invent:9 scientist:6 idea:6 machine:5
invention | object.tech | inventor:9 idea:7 machine:5
microscope | object.tech | telescope:6 lens:7 science:7 germ:7 laboratory:7 scientist:6 cell:6 tiny:5 magnifier:5 bacteria:7
germ | body.inner | bacteria:9 virus:8 sick:6 microscope:7 soap:4
virus | body.inner | germ:8 sick:7 flu:7 computer:4
magnifier | object.tech | lens:7 detective:7 glass:4 microscope:5
fossil | nature.land.ground | dinosaur:8 bone:7 skeleton:7 ancient:6 extinct:7 museum:6 amber:6 rock:5 archaeologist:7 dig:5
archaeologist | person.job | fossil:7 dig:7 ancient:6 ruins:7 tomb:5 pyramid:5 museum:5 history:6
extinct | quality.other | dinosaur:8 fossil:7 mammoth:6 dodo:8
amber | material.gem | fossil:6 orange:4 gem:5 honey:3
skeleton | body.inner | bone:8 skull:8 ghost:5 halloween:5 fossil:6 rib:6 spooky:5 grave:5 pirate:3 dinosaur:4
grave | place.outdoor | tomb:8 graveyard:9 cemetery:9 ghost:5 skeleton:5 coffin:7 dead:6
graveyard | place.outdoor | cemetery:9 grave:9 ghost:6 tomb:6 spooky:5 halloween:4
coffin | object.container | grave:7 vampire:5 dead:5 tomb:5
detective | person.job | mystery:8 clue:8 police:7 spy:5 crime:8 magnifier:7 investigate:8 sherlock:9 case:5 suspect:7
crime | activity.conflict | criminal:9 police:7 thief:7 detective:7 prison:6 steal:6 law:5
thief | person.adventure | steal:9 robber:9 burglar:9 crime:7 police:6 prison:5
robber | person.adventure | thief:9 bank:5 steal:7
steal | action.daily | thief:9 rob:9 crime:6
police | person.job | officer:8 detective:7 siren:6 crime:7 thief:6 prison:5 law:5 badge:6 sheriff:7
sheriff | person.job | police:7 cowboy:6 badge:6
prison | place.building.public | jail:9 dungeon:7 cell:7 thief:5 crime:6 police:5 guard:6 escape:6 bars:6
escape | action.move | run:5 prison:6 flee:8 maze:4
spy | person.job | secret:8 detective:6 agent:9 disguise:7 ninja:4 mystery:5 code:5
mystery | feeling.mind | puzzle:6 riddle:6 secret:7 detective:8 clue:8 unknown:6 crime:5 enigma:9 strange:5 solve:6
solve | activity.study | puzzle:8 riddle:6 mystery:6 answer:6 problem:7
problem | activity.study | solve:7 puzzle:6 trouble:7 question:5
answer | activity.study | question:8 solve:6
question | activity.study | answer:8 ask:7 riddle:5

# ───────────── EXPANSION · SKY & EARTH ─────────────
nebula | sky.space | galaxy:7 star:6 cosmos:6 space:6 cloud:4
satellite | vehicle.space | orbit:8 space:7 rocket:6 moon:5 signal:6 antenna:6 gps:5 planet:4
constellation | sky.space | star:9 galaxy:5 astronomer:5 sky:5 zodiac:7 telescope:5 night:4 pattern:5
zodiac | sky.space | constellation:7 star:5 horoscope:9
alien | person.fantasy | ufo:9 space:7 planet:6 mars:6 spaceship:7 martian:9 monster:4 invade:5
gravity | sky.space | orbit:7 fall:6 weight:6 apple:4 newton:8 space:5 planet:5 physics:7 float:4 heavy:5
weight | quality.size | heavy:8 scale:7 gravity:6
heavy | quality.size | weight:8 anchor:4 elephant:3
horizon | sky.space | sky:7 sunset:7 sunrise:6 sea:6 ocean:6 distance:7 edge:5 view:5
tsunami | weather.storm nature.water.sea | wave:9 earthquake:8 flood:8 ocean:6 disaster:7 sea:5 hurricane:5
disaster | weather.storm | catastrophe:9 earthquake:6 flood:6 tsunami:7 hurricane:5 emergency:5
geyser | nature.water.fresh | steam:7 volcano:5 hot:5 spring:4 erupt:6 water:4
avalanche | weather.storm | snow:8 mountain:7 ski:5 slide:5 landslide:8 blizzard:6 disaster:6 rock:4
landslide | weather.storm | avalanche:8 mud:6 rock:5 disaster:5
quicksand | nature.land.ground | sand:7 swamp:6 mud:5 sink:5 desert:4 trap:4
peninsula | nature.land.coast | coast:6 island:7 bay:5 sea:4
mirage | nature.land.habitat | desert:7 oasis:7 illusion:8 heat:5 sand:4
illusion | feeling.mind | mirage:8 magic:6 trick:7 dream:4
clover | nature.plant.other | luck:8 leaf:5 grass:5 shamrock:9 green:4 bee:3

# ───────────── EXPANSION · ANIMALS ─────────────
sloth | animal.mammal.wild | slow:8 lazy:8 tree:5 jungle:5 rainforest:5 koala:4
platypus | animal.mammal.wild | duck:5 beaver:6 australia:7 egg:4 otter:4
armadillo | animal.mammal.wild | shell:6 desert:4 hedgehog:5 armor:5
narwhal | animal.mammal.marine | whale:8 tusk:8 unicorn:7 arctic:6 horn:6
manatee | animal.mammal.marine | walrus:6 seal:6 dolphin:5 lagoon:4
lemur | animal.mammal.primate | monkey:7 madagascar:7 tail:5
stingray | animal.sea.fish | ray:9 shark:6 sting:6 reef:5 fish:5
swordfish | animal.sea.fish | sword:4 tuna:6 fish:6 marlin:8 ocean:4
piranha | animal.sea.fish | fish:6 tooth:6 bite:6 river:5 amazon:6 shark:4
pufferfish | animal.sea.fish | fish:6 spike:6 poison:6 reef:5 balloon:3
bison | animal.mammal.farm animal.mammal.wild | buffalo:9 cattle:6 bull:6 herd:6 prairie:6 cow:5
buffalo | animal.mammal.wild | bison:9 cattle:6 herd:5 bull:5
hyena | animal.mammal.wild | laugh:6 savanna:6 lion:6 scavenger:6 wolf:4 jackal:7
woodpecker | animal.bird.other | tree:6 beak:6 peck:8 bird:6 bark:4 forest:4
hummingbird | animal.bird.other | nectar:8 flower:5 bird:6 wing:5 tiny:5 fast:4
salamander | animal.amphibian | lizard:6 newt:9 frog:5 fire:3
newt | animal.amphibian | salamander:9 frog:5 lizard:4

# ───────────── EXPANSION · FOOD ─────────────
avocado | food.fruit food.vegetable | guacamole:9 toast:5 green:4 mexico:4 salad:4
guacamole | food.seasoning | avocado:9 dip:6 taco:6 mexico:5
burrito | food.meal | taco:8 tortilla:8 mexico:7 wrap:7 bean:5 rice:4
tortilla | food.staple | taco:8 burrito:8 wrap:7 corn:5
wrap | food.meal | burrito:7 sandwich:6 tortilla:7 gift:4
dumpling | food.meal | noodle:5 china:5 steam:4 soup:4 ravioli:6
lasagna | food.meal | pasta:7 cheese:5 italy:5 tomato:4 oven:4
pretzel | food.snack | salt:6 bread:5 knot:6 germany:5 snack:6 mustard:4
bagel | food.staple | bread:7 donut:6 toast:4 breakfast:5 cream:3
croissant | food.staple | bread:6 pastry:8 butter:6 france:7 bakery:7 breakfast:5 baguette:6
pastry | food.sweet | croissant:8 bakery:7 pie:6 tart:6 cake:5 dough:6 baker:6
peanut | food.snack | nut:8 butter:6 elephant:4 allergy:5 almond:6
almond | food.snack | nut:8 peanut:6 walnut:7
walnut | food.snack | nut:8 almond:7 squirrel:4
cinnamon | food.seasoning | spice:8 sugar:5 apple:5 roll:4 vanilla:5 nutmeg:7
spice | food.seasoning | cinnamon:8 pepper:7 spicy:7 curry:6 salt:5 herb:6 ginger:6
herb | food.seasoning | spice:6 basil:8 mint:7 garlic:5 garden:4 parsley:8
mint | food.seasoning | herb:7 gum:5 fresh:5 toothpaste:5 chocolate:3
ginger | food.seasoning | spice:6 cookie:4 tea:4 garlic:5 root:4
basil | food.seasoning | herb:8 pesto:8 tomato:4 pizza:3
parsley | food.seasoning | herb:8 basil:5

# ───────────── EXPANSION · HOME, PLAY & TRANSPORT ─────────────
toaster | object.kitchen | toast:9 bread:5 kitchen:5 breakfast:4 oven:4
blender | object.kitchen | smoothie:8 kitchen:5 mix:6 juice:4
vacuum | object.tool | clean:7 broom:6 dust:6 mop:5 carpet:5
carpet | object.home | rug:9 floor:7 vacuum:5
rug | object.home | carpet:9 floor:6
hourglass | object.tech | sand:7 time:7 clock:6 timer:7 glass:5 minute:4 wait:4
backpack | object.container | bag:8 school:5 hike:5 camping:5 suitcase:5 strap:5
parachute | object.misc vehicle.air | skydiving:9 plane:6 fall:6 jump:5 sky:5 pilot:4 float:4 glide:5
skydiving | activity.sport | parachute:9 plane:5 jump:5 sky:5
zeppelin | vehicle.air | airship:9 balloon:6 blimp:9 helium:6 sky:4
blimp | vehicle.air | zeppelin:9 airship:8 balloon:6
helium | material.other | balloon:8 gas:7 float:5
sled | vehicle.land object.toy | sleigh:8 snow:7 winter:6 hill:4 toboggan:9 ski:5
sleigh | vehicle.land | santa:7 reindeer:7 sled:8 snow:6 christmas:5 bell:4
snowboard | activity.sport | ski:8 snow:7 skateboard:7 slope:6 mountain:4
skateboard | activity.sport object.toy | skate:7 snowboard:7 surfboard:6 wheel:4 ramp:6
trampoline | object.toy | bounce:9 jump:8 spring:5 playground:4
seesaw | object.toy | playground:7 swing:6 slide:6
firework | object.misc | rocket:5 explode:6 spark:6 celebration:7 night:4 festival:6 sparkler:8 bang:6 party:5 boom:6
explode | action.move | explosion:9 blast:8 bomb:8 boom:7 firework:6 volcano:5
bang | quality.other | boom:8 loud:7 explode:6 drum:5
boom | quality.other | bang:8 thunder:7 explode:7 loud:6
scarecrow | object.decoration | crow:7 field:6 farm:6 straw:6 hay:5 pumpkin:4 halloween:4 crop:5 farmer:5 corn:4
tractor | vehicle.land | farm:8 farmer:7 field:6 truck:5 plow:7 hay:4 barn:4 crop:4 wheel:4
shipwreck | object.misc | ship:7 wreck:9 treasure:6 sink:5 storm:5 pirate:5 lighthouse:5 island:5 diver:5 reef:5 ocean:4 sunken:8 titanic:7
titanic | vehicle.water | ship:7 iceberg:7 shipwreck:7 sink:5

# ───────────── EXPANSION · MUSIC, STAGE & ART ─────────────
xylophone | object.music | percussion:7 drum:4 mallet:6 piano:4 bell:4
harmonica | object.music | blues:6 flute:5 mouth:4 guitar:4 accordion:5 whistle:4
accordion | object.music | piano:6 harmonica:5 polka:6 keyboard:4
saxophone | object.music | jazz:9 trumpet:7 clarinet:7 brass:5 band:5
jazz | activity.music | saxophone:9 blues:8 music:6 trumpet:6 band:5 piano:4
blues | activity.music | jazz:8 guitar:5 music:5 harmonica:6
clarinet | object.music | flute:7 saxophone:7 oboe:7
tuba | object.music | trumpet:7 trombone:7 brass:7 band:4
trombone | object.music | trumpet:8 tuba:7 brass:7 jazz:5
microphone | object.tech | singer:7 sing:5 speaker:6 stage:6 voice:6 radio:5 concert:5 karaoke:8
stage | place.building.public | theater:8 concert:6 curtain:6 actor:7 spotlight:7 perform:7 microphone:6 show:6
theater | place.building.public | stage:8 play:6 actor:8 audience:7 curtain:6 cinema:6 drama:7 show:6 ticket:5 opera:6
cinema | place.building.public | movie:9 film:8 popcorn:7 theater:6 screen:6 ticket:5
movie | activity.art | film:9 cinema:9 actor:7 screen:5 popcorn:6 director:6 hollywood:6 camera:4 television:5
film | activity.art | movie:9 cinema:8 camera:7 actor:6 photo:4
actor | person.job | actress:9 movie:7 theater:8 stage:7 film:6 star:6 celebrity:6 director:5 role:6 hollywood:5
director | person.job | movie:6 film:6 actor:5 boss:5
celebrity | person.job | famous:8 star:7 actor:6 fan:5
famous | quality.other | celebrity:8 star:5 fame:9 legend:4
audience | person.family | crowd:8 theater:7 concert:5 fan:6 applause:7
crowd | person.family | audience:8 people:7 stadium:5
applause | action.daily | clap:9 audience:7 cheer:6
clap | action.daily | applause:9 hand:6 cheer:5
ticket | object.paper | cinema:5 train:5 concert:5 theater:5 passport:4 plane:4 movie:4
passport | object.paper | travel:7 airport:6 border:6 ticket:4 suitcase:5 visa:8 holiday:3
museum | place.building.public | exhibit:9 statue:6 fossil:6 history:7 art:7 gallery:8 dinosaur:5 painting:6 ancient:5 sculpture:6 mummy:4
statue | activity.art | sculpture:9 marble:7 museum:6 stone:5 monument:7 bronze:5
sculpture | activity.art | statue:9 art:7 sculptor:9 marble:7 clay:6 museum:6 gallery:5 carve:6
marble | material.other | statue:7 sculpture:7 stone:6 floor:4
monument | place.building.grand | statue:7 memorial:8 tower:4 history:5
circus | place.outdoor activity.leisure | clown:9 tent:7 acrobat:8 juggle:7 elephant:4 lion:3 ringmaster:8 trapeze:7 carnival:6
clown | person.job | circus:9 joke:6 juggle:6 funny:6 costume:5 jester:7
acrobat | person.job | circus:8 trapeze:7 gymnast:7 juggle:4
juggle | action.move | clown:6 circus:7 ball:4 acrobat:4
carnival | activity.leisure | festival:7 circus:6 parade:7 costume:6 fair:7
parade | activity.leisure | carnival:7 march:7 festival:6 band:5
costume | object.clothing.wear | halloween:7 mask:7 disguise:7 party:4 clown:5 carnival:6
mask | object.clothing.head | costume:7 disguise:8 face:6 snorkel:5 superhero:5 carnival:5 raccoon:4
disguise | object.clothing.wear | mask:8 costume:7 spy:7 secret:5
joke | activity.art | funny:8 laugh:7 clown:6 jester:6 riddle:4
funny | quality.other | joke:8 laugh:7 clown:6 silly:7

# ───────────── EXPANSION · PEOPLE, WORK & SPORT ─────────────
lawyer | person.job | judge:8 court:8 law:9 attorney:9
judge | person.job | court:9 lawyer:8 law:8 jury:8 trial:7
court | place.building.public | judge:9 lawyer:8 law:7 trial:8 jury:7 tennis:5
law | activity.study | lawyer:9 judge:8 police:5 court:7 rule:7
carpenter | person.job | wood:8 hammer:7 saw:7 build:5 plank:5 furniture:5 nail:5
plumber | person.job | pipe:8 sink:6 wrench:7 water:4 leak:7 toilet:5
mechanic | person.job | car:7 engine:8 wrench:7 garage:7 tool:5 repair:7
engineer | person.job | build:6 machine:6 bridge:5 design:6 science:5
architect | person.job | building:7 design:7 house:5 blueprint:8 skyscraper:5
waiter | person.job | restaurant:8 menu:6 tip:5 cafe:5
gardener | person.job | garden:8 plant:6 flower:5 shovel:5 lawn:5 seed:4
fisherman | person.job | fishing:9 fish:7 boat:6 net:6 rod:6 sailor:5 hook:5
librarian | person.job | library:9 book:7 quiet:4
factory | place.building.public | machine:6 worker:7 industry:8 warehouse:7 smoke:4 chimney:5 robot:4
warehouse | place.building.public | factory:7 storage:7 box:6
worker | person.job | work:7 factory:7 job:6
work | activity.study | job:9 office:7 career:7 worker:7
office | place.building.public | desk:7 work:7 boss:5 computer:5 meeting:6
mine | place.outdoor | coal:7 miner:9 gold:6 cave:5 tunnel:6 diamond:4 dig:5 underground:6
miner | person.job | mine:9 coal:6 pickaxe:7 gold:4 dig:5 tunnel:5
olympics | activity.sport | medal:8 athlete:8 gold:5 sport:7 torch:6 champion:6 race:5
athlete | person.job | sport:8 olympics:8 runner:7 champion:6
marathon | activity.sport | run:8 race:7 runner:8 athlete:6
runner | person.job | run:8 marathon:8 race:7 athlete:7
champion | person.job | winner:9 trophy:7 medal:6 victory:6
referee | person.job | whistle:7 football:7 soccer:6 match:5 umpire:9
hockey | activity.sport | ice:6 puck:9 skate:7 stick:5 rink:7 sport:6
rink | place.outdoor | skate:8 ice:6 hockey:7
archery | activity.sport | bow:8 arrow:8 archer:9 target:8
archer | person.job | bow:8 arrow:8 archery:9 target:6
target | object.misc | arrow:7 archery:8 dart:7 aim:8 goal:5 bullseye:9
karate | activity.sport | martial:8 kick:6 judo:8 belt:5 ninja:4 fight:5
gymnast | person.job | gymnastics:9 acrobat:7 olympics:6 flip:6
volleyball | activity.sport | net:6 beach:5 ball:6 sport:5
bowling | activity.sport | pin:7 ball:6 strike:6 alley:7
stadium | place.building.public | football:7 arena:8 crowd:5 sport:6 match:5 soccer:5 concert:4
arena | place.building.public | stadium:8 gladiator:8 sport:4 crowd:5

# ───────────── EXPANSION · FEELINGS, SOUNDS & CELEBRATIONS ─────────────
courage | feeling.positive | brave:9 bold:7 hero:6 fear:5 lion:3 strength:5
pride | feeling.positive | proud:9 lion:6 honor:6
honor | feeling.positive | pride:6 respect:7 knight:4
jealous | feeling.negative | envy:9 jealousy:9
envy | feeling.negative | jealous:9 green:4
guilt | feeling.negative | shame:8 sorry:6 regret:7 blame:6
shame | feeling.negative | guilt:8 embarrassed:7
bored | feeling.negative | boredom:9 dull:6 yawn:6
curiosity | feeling.mind | curious:9 cat:4 question:5 explore:6 wonder:7
curious | feeling.mind | curiosity:9 wonder:6
wonder | feeling.mind | curiosity:7 amazement:8 think:6 marvel:7
surprise | feeling.positive | shock:7 gift:5 party:5 astonish:8
nostalgia | feeling.mind | memory:7 past:6 remember:5
nightmare | feeling.mind | dream:8 fear:7 monster:6 sleep:6 scream:5 horror:6 night:5 ghost:4
silence | quality.other | quiet:9 silent:9 peace:5 calm:5 hush:8 library:5 noise:5 whisper:6 still:5
whisper | action.daily | quiet:7 secret:6 silence:6 murmur:7 shout:4
echo | quality.other | sound:7 cave:6 canyon:6 repeat:6 mountain:4 shout:5 noise:5
shadow | quality.other | shade:7 dark:6 silhouette:7 light:6 sun:5 darkness:6 eclipse:5 ninja:4 night:4
luck | feeling.positive | fortune:8 chance:7 lucky:9 dice:5 clover:8 horseshoe:7 charm:6 wish:4 lottery:7
horseshoe | object.misc | horse:7 luck:7 hoof:6 iron:4
lottery | activity.leisure | luck:7 money:6 ticket:5 jackpot:9 win:6
fortune | feeling.positive | luck:8 money:5 rich:6 treasure:4
rich | quality.other | wealthy:9 money:6 gold:6 fortune:6 mansion:5 poor:6
poor | quality.other | rich:6 poverty:8
yawn | action.daily | tired:8 sleep:6 bored:6
tired | quality.other | sleepy:9 yawn:8 sleep:7 exhausted:9 rest:6
adventure | activity.leisure | explore:7 explorer:8 journey:7 quest:8 travel:6 treasure:5 map:5 pirate:4 hero:5 danger:6 jungle:4 expedition:8
quest | activity.leisure | adventure:8 journey:6 knight:5 mission:7 hero:5
danger | quality.other | risk:8 peril:9 hazard:8 threat:7 warning:6
expedition | activity.leisure | adventure:8 explorer:7 journey:6 voyage:5
easter | activity.leisure | egg:7 bunny:7 rabbit:6 chocolate:5 spring:5
thanksgiving | activity.leisure | turkey:8 harvest:6 pumpkin:5 feast:6 autumn:4 pie:4
wedding | activity.leisure | bride:9 groom:9 ring:8 marriage:9 dress:5 cake:5 church:5 bouquet:5 love:5 engagement:7 veil:6
bride | person.family | wedding:9 groom:8 veil:7 dress:5
groom | person.family | bride:8 wedding:9

# ───────────── EXPANSION · EXTRA LINKS FOR NEW ANSWER WORDS ─────────────
troll | person.fantasy | ugly:6 fairy:5 tale:5 forest:5 mountain:4
goblin | person.fantasy | ugly:6 treasure:5 tale:5 halloween:5 witch:5 dwarf:6
zombie | person.fantasy | dead:7 grave:6 spooky:6 horror:6 scream:5
villain | person.fantasy | wicked:6 dragon:5 witch:5 pirate:5 hero:7 thief:5 story:5
atom | activity.study | chemistry:7 electricity:5 energy:6 small:5 microscope:5 laboratory:5
magnet | object.tool | electricity:6 steel:6 science:6 physics:6 electric:5
platypus | animal.mammal.wild | kangaroo:6 koala:6 beak:6 river:5 strange:5
hyena | animal.mammal.wild | cheetah:6 leopard:6 zebra:5 predator:6 dog:5 coyote:6
avocado | food.fruit food.vegetable | mango:6 lime:5 tomato:5 burrito:6 taco:6 sandwich:5 fruit:5 vegetable:5
burrito | food.meal | sandwich:6 cheese:5 chili:6 salsa:7 lunch:5 guacamole:6
pretzel | food.snack | chips:6 popcorn:6 crisps:6 cracker:6 bakery:5 dough:6
cinnamon | food.seasoning | ginger:7 cookie:5 cake:5 pie:5 bakery:5 tea:5 honey:5
peanut | food.snack | walnut:7 jelly:6 sandwich:5 snack:6 squirrel:5 popcorn:5 monkey:4
toaster | object.kitchen | microwave:7 kettle:7 stove:6 fridge:5 blender:6 bagel:6
vacuum | object.tool | rug:6 floor:6 cleaner:8 wash:5 machine:5 noise:5 suck:7
skateboard | activity.sport object.toy | scooter:7 bicycle:5 helmet:5 trick:6 skate:8
trampoline | object.toy | swing:6 slide:6 seesaw:6 hop:7 garden:4 circus:5 acrobat:5
harmonica | object.music | music:6 song:5 jazz:6 trumpet:5 saxophone:5 cowboy:5 ukulele:5
passport | object.paper | journey:6 vacation:6 flight:6 stamp:7 photo:5 luggage:6 country:6
factory | place.building.public | machine:7 build:6 engine:5 metal:5 car:4 steel:5
plumber | person.job | tap:7 bathroom:7 drain:7 tool:6 mechanic:6 carpenter:6
courage | feeling.positive | knight:6 warrior:6 hope:5 superhero:6 danger:6 adventure:5 pride:5
curiosity | feeling.mind | mystery:6 explorer:6 learn:6 science:5 secret:5 idea:5 adventure:5
echo | quality.other | voice:7 hear:6 ear:5 loud:5 whisper:5 silence:5 tunnel:6 valley:5
silence | quality.other | sound:6 peace:6 secret:4 night:5 empty:5
whisper | action.daily | voice:7 hear:6 ear:6 talk:6 sound:6 echo:5 library:5 mystery:4
luck | feeling.positive | win:6 coin:5 rabbit:5 rainbow:5 gamble:7 magic:5 star:5
clover | nature.plant.other | meadow:6 field:5 flower:5 daisy:6 lawn:5 rainbow:4
marathon | activity.sport | sprint:7 jog:7 olympics:6 medal:6 champion:6 winner:5 sweat:5 sport:6
archery | activity.sport | olympics:6 sport:6 medal:5 aim:7 sword:4 knight:4 hunt:6
hockey | activity.sport | football:6 soccer:6 tennis:5 team:6 goal:7 winter:5 helmet:5
deer | animal.mammal.wild | antelope:7 gazelle:7 venison:7 hunter:6 meadow:5
thanksgiving | activity.leisure | dinner:7 family:6 holiday:6 november:7 christmas:6 food:5 roast:5

# ───────────── BIG EXPANSION · ANIMALS ─────────────
puma | animal.mammal.feline | cougar:9 lion:6 panther:7 cat:5 mountain:4
cougar | animal.mammal.feline | puma:9 panther:7 lion:5
lynx | animal.mammal.feline | bobcat:8 cat:6 forest:4 snow:3
bobcat | animal.mammal.feline | lynx:8 cat:6
ocelot | animal.mammal.feline | jaguar:7 leopard:6 jungle:5 cat:5
tomcat | animal.mammal.feline | cat:8 kitten:5
dingo | animal.mammal.canine | dog:7 wolf:6 australia:7
jackal | animal.mammal.canine | coyote:7 wolf:6 desert:4 fox:5
poodle | animal.mammal.canine | dog:8 puppy:6 pet:5 curly:5
beagle | animal.mammal.canine | dog:8 hound:7 puppy:6
terrier | animal.mammal.canine | dog:8 puppy:6
labrador | animal.mammal.canine | dog:8 retriever:8 puppy:6
retriever | animal.mammal.canine | dog:8 labrador:8 fetch:6
dalmatian | animal.mammal.canine | dog:8 spots:8 firefighter:4
husky | animal.mammal.canine | dog:8 sled:7 snow:5 wolf:5
bulldog | animal.mammal.canine | dog:8 puppy:5
chihuahua | animal.mammal.canine | dog:8 tiny:5 mexico:4
greyhound | animal.mammal.canine | dog:8 race:6 fast:6 hound:7
collie | animal.mammal.canine | dog:8 sheep:5
wolfpack | animal.mammal.canine | wolf:8 pack:8
gazelle | animal.mammal.wild | antelope:8 deer:6 savanna:6 cheetah:5 fast:5
antelope | animal.mammal.wild | gazelle:8 deer:7 savanna:6
impala | animal.mammal.wild | antelope:8 gazelle:7 savanna:5
wildebeest | animal.mammal.wild | gnu:9 savanna:6 herd:6 zebra:5
gnu | animal.mammal.wild | wildebeest:9
warthog | animal.mammal.wild | pig:6 boar:7 savanna:5 tusk:5
boar | animal.mammal.wild | pig:7 hog:7 tusk:6 forest:4
meerkat | animal.mammal.wild | desert:5 burrow:6 mongoose:6
mongoose | animal.mammal.wild | meerkat:6 snake:5 cobra:5
badger | animal.mammal.wild | burrow:7 wolverine:5 otter:4 forest:4
wolverine | animal.mammal.wild | badger:5 bear:4 claw:5
skunk | animal.mammal.wild | stink:8 smell:6 raccoon:5 stripes:4
opossum | animal.mammal.wild | possum:9 raccoon:5
possum | animal.mammal.wild | opossum:9 raccoon:4
weasel | animal.mammal.wild | ferret:8 stoat:8 mink:7
ferret | animal.mammal.wild | weasel:8 pet:5
stoat | animal.mammal.wild | weasel:8 ermine:8
mink | animal.mammal.wild | weasel:7 fur:6
mole | animal.mammal.rodent | burrow:7 tunnel:6 dig:6 underground:6
vole | animal.mammal.rodent | mouse:7 mole:5
gerbil | animal.mammal.rodent | hamster:8 mouse:6 pet:5
guinea | animal.mammal.rodent | hamster:7 pig:4 pet:5
chinchilla | animal.mammal.rodent | hamster:6 fur:6 pet:4
marmot | animal.mammal.rodent | groundhog:8 squirrel:6 mountain:4
groundhog | animal.mammal.rodent | marmot:8 burrow:6 shadow:4
burrow | nature.land.ground | rabbit:6 mole:7 tunnel:6 hole:7 dig:6
lemming | animal.mammal.rodent | mouse:6 arctic:5
gibbon | animal.mammal.primate | ape:7 monkey:7 jungle:5
orangutan | animal.mammal.primate | ape:8 gorilla:7 jungle:6 chimpanzee:6
macaque | animal.mammal.primate | monkey:8
mandrill | animal.mammal.primate | baboon:8 monkey:7
bonobo | animal.mammal.primate | chimpanzee:9 ape:7
yak | animal.mammal.farm | ox:7 cattle:6 mountain:5 tibet:5
camelid | animal.mammal.wild | camel:7 llama:7
stallion | animal.mammal.farm | horse:9 mare:7 pony:5
mare | animal.mammal.farm | horse:9 stallion:7 foal:7
foal | animal.mammal.farm | horse:7 pony:7 mare:7
colt | animal.mammal.farm | foal:8 horse:7
mustang | animal.mammal.farm | horse:8 stallion:6 wild:5
kid | person.age | goat:5
billy | animal.mammal.farm | goat:7
heifer | animal.mammal.farm | cow:8 calf:7
steer | animal.mammal.farm | bull:7 cattle:7
rooster | animal.bird.farm | crow:5 cockerel:9
cockerel | animal.bird.farm | rooster:9 chicken:7
gander | animal.bird.farm | goose:8
quail | animal.bird.farm | pheasant:7 partridge:7 egg:4
pheasant | animal.bird.farm | quail:7 partridge:7 grouse:7
partridge | animal.bird.farm | pheasant:7 quail:7
grouse | animal.bird.farm | pheasant:7
peahen | animal.bird.other | peacock:9
parakeet | animal.bird.other | budgie:9 parrot:8 cage:5 pet:5
budgie | animal.bird.other | parakeet:9 parrot:7
cockatoo | animal.bird.other | parrot:8 macaw:6 australia:4
canary | animal.bird.other | yellow:6 cage:6 sing:5 finch:6
lark | animal.bird.other | sparrow:6 sing:5 morning:4
nightingale | animal.bird.other | sing:7 night:5 song:6
wren | animal.bird.other | sparrow:7 robin:6
starling | animal.bird.other | sparrow:6 flock:6
magpie | animal.bird.other | crow:7 raven:6 shiny:4
jay | animal.bird.other | magpie:6 crow:5 blue:4
bluebird | animal.bird.other | robin:6 blue:6 sparrow:5
cardinal | animal.bird.other | red:7 robin:5
oriole | animal.bird.other | bird:6 orange:4
blackbird | animal.bird.other | crow:7 raven:5 black:5
swallow | animal.bird.other | swift:8 migrate:6 sparrow:5
swift | animal.bird.other quality.other | swallow:8 fast:7 quick:7
kingfisher | animal.bird.other | river:6 fish:5 dive:5
heron | animal.bird.sea | egret:8 crane:7 stork:7 pond:5 fish:4
egret | animal.bird.sea | heron:8 white:4
crane | animal.bird.sea object.tool | heron:7 stork:7 construction:6 lift:5
stork | animal.bird.sea | heron:7 crane:7 baby:5
ibis | animal.bird.sea | heron:6 egypt:4
cormorant | animal.bird.sea | pelican:6 seagull:5 dive:4
gannet | animal.bird.sea | seagull:6 dive:5
tern | animal.bird.sea | seagull:8 gull:7
loon | animal.bird.sea | duck:6 lake:6
condor | animal.bird.prey | vulture:8 eagle:6 andes:4
buzzard | animal.bird.prey | hawk:7 vulture:7
kestrel | animal.bird.prey | falcon:8 hawk:7
osprey | animal.bird.prey | hawk:7 eagle:7 fish:5
emu | animal.bird.other | ostrich:8 australia:6
kiwi | animal.bird.other | bird:4 newzealand:4
dodo | animal.bird.other | extinct:9 bird:5
roadrunner | animal.bird.other | desert:6 coyote:6 fast:5
woodcock | animal.bird.other | woodpecker:4 bird:5
gosling | animal.bird.farm | goose:8 duckling:6
cygnet | animal.bird.farm | swan:8
owlet | animal.bird.prey | owl:9
eaglet | animal.bird.prey | eagle:9
cod | animal.sea.fish food.meat | haddock:8 fish:7 chips:5
haddock | animal.sea.fish | cod:8 fish:7
halibut | animal.sea.fish | flounder:7 fish:7
flounder | animal.sea.fish | halibut:7 sole:7 fish:7
sardine | animal.sea.fish food.meat | anchovy:8 herring:7 fish:7 tin:4
anchovy | animal.sea.fish food.meat | sardine:8 pizza:4 fish:6
herring | animal.sea.fish | sardine:7 fish:7
mackerel | animal.sea.fish | tuna:6 fish:7
catfish | animal.sea.fish | fish:7 whisker:6 river:5
carp | animal.sea.fish | koi:8 goldfish:7 pond:6
koi | animal.sea.fish | carp:8 pond:7 goldfish:6 japan:4
bass | animal.sea.fish object.music | fish:6 guitar:5 trout:5
pike | animal.sea.fish | fish:6 lake:5
minnow | animal.sea.fish | fish:6 tiny:5
guppy | animal.sea.fish | goldfish:7 aquarium:6
marlin | animal.sea.fish | swordfish:8 tuna:5
barracuda | animal.sea.fish | shark:5 reef:5 fish:6
clownfish | animal.sea.fish | reef:7 anemone:8 fish:6 orange:4 coral:6
angelfish | animal.sea.fish | reef:6 aquarium:6
anemone | animal.sea.other | clownfish:8 reef:6 coral:6 tentacle:5
urchin | animal.sea.other | spike:7 reef:5 starfish:6
sponge | animal.sea.other object.kitchen | soap:5 wash:5 reef:4 squishy:5
sealion | animal.mammal.marine | seal:9 walrus:6
beluga | animal.mammal.marine | whale:8 arctic:5 white:4
dugong | animal.mammal.marine | manatee:9
seaotter | animal.mammal.marine | otter:9
plankton | animal.sea.other | krill:7 whale:5 ocean:4 tiny:5
scallop | animal.sea.shellfish | clam:7 shell:7 seafood:6
conch | animal.sea.shellfish | shell:8 seashell:8 beach:5
seashell | nature.sea_find | shell:9 beach:7 conch:8
barnacle | animal.sea.shellfish | ship:4 rock:5 shell:5
cuttlefish | animal.sea.other | squid:8 octopus:7 ink:6
nautilus | animal.sea.other | shell:7 octopus:5 squid:5
crayfish | animal.sea.shellfish | lobster:8 crab:6 river:5
komodo | animal.reptile | lizard:8 dragon:6
monitor | object.tech | screen:9 computer:7 lizard:3
caiman | animal.reptile | alligator:8 crocodile:8
anaconda | animal.reptile | snake:8 python:8 jungle:5
rattlesnake | animal.reptile | snake:9 rattle:8 venom:7 desert:5
boa | animal.reptile | snake:8 python:7
mamba | animal.reptile | snake:8 venom:7 cobra:6
bullfrog | animal.amphibian | frog:9 pond:6
axolotl | animal.amphibian | salamander:8 newt:7
ladybird | animal.small.insect | ladybug:9 beetle:7
locust | animal.small.insect | grasshopper:8 swarm:7 crop:4
cicada | animal.small.insect | cricket:7 summer:5 buzz:5
mantis | animal.small.insect | insect:7 grasshopper:5 pray:4
earwig | animal.small.insect | insect:6 bug:5
flea | animal.small.insect | itch:7 dog:4 bite:5 tick:6
louse | animal.small.insect | flea:7 itch:6 hair:4
gnat | animal.small.insect | mosquito:7 fly:7 tiny:5
midge | animal.small.insect | gnat:8 mosquito:7
housefly | animal.small.insect | fly:9 buzz:6
bluebottle | animal.small.insect | fly:8 jellyfish:3
weevil | animal.small.insect | beetle:7 bug:6
firebug | animal.small.insect | bug:6 beetle:5
silkworm | animal.small.insect | silk:9 caterpillar:7 cocoon:7
larva | animal.small.insect | caterpillar:7 grub:8 maggot:7
maggot | animal.small.insect | larva:7 fly:6 worm:5
grub | animal.small.insect | larva:8 worm:6 beetle:5
millipede | animal.small.crawler | centipede:9 worm:5 legs:6
centipede | animal.small.crawler | millipede:9 legs:6 bug:5
tick | animal.small.crawler | flea:6 bite:5 itch:5
mite | animal.small.crawler | tick:7 tiny:6 dust:5
leech | animal.small.crawler | worm:6 blood:6 swamp:5
earthworm | animal.small.crawler | worm:9 soil:7
spiderweb | animal.small.crawler | web:9 spider:9 cobweb:9
cobweb | animal.small.crawler | spiderweb:9 web:8 dust:5 spooky:4
swarm | animal.small.insect | bee:6 locust:7 flock:5
colony | animal.small.insect | ant:7 bee:5 hive:5
anthill | animal.small.insect | ant:9 colony:6
queenbee | animal.small.insect | bee:9 queen:6 hive:7
drone | object.tech animal.small.insect | bee:5 fly:5 camera:5 robot:5
pup | animal.mammal.canine | puppy:9 dog:7 seal:4
fawn | animal.mammal.wild | deer:9 doe:7 bambi:6
doe | animal.mammal.wild | deer:9 fawn:7 stag:7
stag | animal.mammal.wild | deer:9 antler:8 doe:7
bambi | animal.mammal.wild | fawn:7 deer:6
joey | animal.mammal.wild | kangaroo:9 pouch:7
pouch | animal.mammal.wild | kangaroo:8 bag:5 joey:7
wallaby | animal.mammal.wild | kangaroo:9 australia:6
wombat | animal.mammal.wild | koala:6 australia:6 burrow:5
tasmanian | animal.mammal.wild | devil:6 australia:5
aardvark | animal.mammal.wild | anteater:8 ant:6 termite:5
anteater | animal.mammal.wild | aardvark:8 ant:7 tongue:5
tapir | animal.mammal.wild | pig:5 rainforest:5
okapi | animal.mammal.wild | giraffe:8 zebra:5 rainforest:4
pangolin | animal.mammal.wild | anteater:6 scale:6 armadillo:6
capybara | animal.mammal.rodent | guinea:6 rodent:6 river:4
rodent | animal.mammal.rodent | mouse:7 rat:7 squirrel:6 hamster:6
mammal | animal | whale:4 dog:4 animal:7 bear:4
amphibian | animal.amphibian | frog:8 toad:7 salamander:7 newt:7
bird | animal.bird.other | flight:5
fish | animal.sea.fish | scales:5
wildlife | animal | animal:8 nature:7 safari:6 forest:5 zoo:5
fauna | animal | wildlife:8 animal:7 flora:7
flora | nature.plant.other | plant:7 fauna:7 flower:6
whisker | body.part | cat:7 mouse:4 beard:5
hoof | body.part | horse:7 cow:5 horseshoe:6
snout | body.part | nose:8 pig:7 muzzle:7
muzzle | body.part | snout:7 nose:6 dog:5
mane | body.part | hair:5
fleece | material.other | wool:8 sheep:7 lamb:6 jacket:5
shell | animal.sea.other | crab:5
quack | action.daily | duckling:5
neigh | action.daily | horse:9 pony:6
bleat | action.daily | sheep:8 goat:8 lamb:6
growl | action.daily | dog:6 bear:6 wolf:6 roar:6 snarl:7
snarl | action.daily | growl:7 wolf:5 dog:5
bark | action.daily | growl:5
squeak | action.daily | mouse:7 hamster:5 door:3
chirping | action.daily | chirp:9 tweet:7 cricket:5
honk | action.daily | goose:7 horn:6 car:5
cluck | action.daily | chicken:8 hen:7
gobble | action.daily | turkey:8 eat:5
buzzing | action.daily | buzz:9 bee:7
hibernate | action.daily | bear:7 winter:6 sleep:7 hedgehog:5
nocturnal | quality.other | night:7 owl:7 bat:6
predatory | quality.other | predator:9 hunt:6
camouflage | quality.other | chameleon:7 hide:7 disguise:6 soldier:4

# ───────────── BIG EXPANSION · FOOD & DRINK ─────────────
nectarine | food.fruit | peach:9 plum:6 apricot:7
prune | food.fruit | plum:8 dried:6 raisin:6
fig | food.fruit | date:6 plum:5 fruit:5
pomegranate | food.fruit | seed:6 red:5 fruit:5 cherry:4
guava | food.fruit | mango:7 papaya:7 tropical:6
lychee | food.fruit | fruit:5 tropical:5 grape:4
passionfruit | food.fruit | mango:6 tropical:6 fruit:5
dragonfruit | food.fruit | tropical:6 pink:4 kiwi:5
cranberry | food.fruit | berry:8 blueberry:7 turkey:4 juice:5
blackberry | food.fruit | berry:9 raspberry:8 blueberry:7
gooseberry | food.fruit | berry:8 grape:5
elderberry | food.fruit | berry:8
mulberry | food.fruit | berry:8 silkworm:4
currant | food.fruit | raisin:7 berry:7
cantaloupe | food.fruit | melon:9 watermelon:7
honeydew | food.fruit | melon:9 cantaloupe:8
clementine | food.fruit | tangerine:9 mandarin:9 orange:8
kumquat | food.fruit | orange:6 citrus:7
quince | food.fruit | pear:7 apple:6
persimmon | food.fruit | fruit:5 orange:4
starfruit | food.fruit | tropical:6 star:4
jackfruit | food.fruit | tropical:6 durian:6
durian | food.fruit | tropical:6 smell:5 jackfruit:6
plantain | food.fruit | banana:9
olive | food.fruit color.green | oil:8 greece:6 pizza:4 martini:5 green:5
asparagus | food.vegetable | broccoli:6 spear:4 vegetable:6
artichoke | food.vegetable | vegetable:6 thistle:5
celery | food.vegetable | carrot:6 stick:5 crunchy:5 salad:5
radish | food.vegetable | carrot:6 beet:6 turnip:7 red:4
turnip | food.vegetable | radish:7 parsnip:7 beet:6
parsnip | food.vegetable | carrot:8 turnip:7
beet | food.vegetable | beetroot:9 radish:6 turnip:6 purple:4
beetroot | food.vegetable | beet:9
leek | food.vegetable | onion:7 soup:5
shallot | food.vegetable | onion:9 garlic:6
scallion | food.vegetable | onion:8 leek:6
chive | food.seasoning | onion:6 herb:7
yam | food.vegetable | potato:8 sweet:4
eggplant | food.vegetable | aubergine:9 zucchini:6 purple:5
aubergine | food.vegetable | eggplant:9
okra | food.vegetable | vegetable:5 gumbo:6
sprouts | food.vegetable | cabbage:7 sprout:6 christmas:4
lentil | food.vegetable | bean:7 pea:6 soup:5
chickpea | food.vegetable | hummus:9 bean:7 lentil:6
hummus | food.seasoning | chickpea:9 dip:7 pita:6
tofu | food.vegetable | soy:9 bean:6 vegan:6
soy | food.vegetable | tofu:9 bean:7 sauce:5
mushroom | food.vegetable | portobello:7
pumpkinseed | food.snack | pumpkin:7 seed:7
peppercorn | food.seasoning | pepper:9 salt:5 spice:6
paprika | food.seasoning | pepper:7 spice:7 red:4
cumin | food.seasoning | spice:8 curry:6
turmeric | food.seasoning | spice:8 curry:7 yellow:5
nutmeg | food.seasoning | cinnamon:7 spice:8
clove | food.seasoning | spice:7 cinnamon:6 garlic:5
saffron | food.seasoning | spice:8 rice:5 yellow:5
oregano | food.seasoning | herb:8 basil:7 pizza:5
thyme | food.seasoning | herb:8 rosemary:7 time:3
rosemary | food.seasoning | herb:8 thyme:7
sage | food.seasoning person.fantasy | herb:7 wise:6 wisdom:5
dill | food.seasoning | herb:7 pickle:7
coriander | food.seasoning | cilantro:9 herb:7
cilantro | food.seasoning | coriander:9 herb:7 salsa:5
vanillin | food.seasoning | vanilla:9
salsa | food.seasoning | tomato:7 chili:6 taco:6 dip:7 dance:4
pesto | food.seasoning | basil:8 pasta:6 garlic:5
gravy | food.seasoning | sauce:8 roast:6 turkey:5 potato:5
mayonnaise | food.seasoning | mayo:9 sauce:6 egg:5 sandwich:5
mayo | food.seasoning | mayonnaise:9
vinaigrette | food.seasoning | dressing:9 salad:7 vinegar:7
dressing | food.seasoning | salad:7 sauce:6
relish | food.seasoning | pickle:7 hotdog:6 mustard:5
wasabi | food.seasoning | sushi:8 spicy:6 green:4
soysauce | food.seasoning | soy:8 sushi:6 sauce:7
honeycomb | food.sweet | honey:9 beehive:7 hive:7 bee:6 wax:5
molasses | food.sweet | syrup:8 sugar:7 treacle:8
treacle | food.sweet | molasses:8 syrup:7
marmalade | food.sweet | jam:9 orange:7 toast:6
custard | food.sweet | pudding:7 cream:6 egg:5 dessert:6
meringue | food.sweet | egg:6 dessert:6 pie:5 sugar:5
mousse | food.sweet | dessert:7 chocolate:6 cream:5
sorbet | food.sweet | icecream:7 dessert:6 fruit:5
gelato | food.sweet | icecream:9 italy:6
sundae | food.sweet | icecream:8 cherry:5 dessert:6
popsicle | food.sweet | icecream:7 summer:6 lolly:8 stick:5
lolly | food.sweet | lollipop:8 popsicle:8 candy:7
cheesecake | food.sweet | cake:8 cheese:6 dessert:7
eclair | food.sweet | pastry:8 chocolate:6 cream:6
macaron | food.sweet | cookie:7 france:5 pastry:6
cannoli | food.sweet | pastry:7 italy:6
strudel | food.sweet | pastry:7 apple:6
crumble | food.sweet | pie:6 apple:5 dessert:6
cobbler | food.sweet person.job | pie:6 shoe:5 crumble:6
tiramisu | food.sweet | dessert:7 coffee:6 italy:6
trifle | food.sweet | dessert:7 custard:6 jelly:6
crepe | food.sweet | pancake:9 france:5
scone | food.sweet | biscuit:7 tea:6 jam:6 cream:5
shortbread | food.sweet | biscuit:8 butter:6 cookie:7
gingerbread | food.sweet | ginger:7 cookie:8 christmas:6 house:4
marzipan | food.sweet | almond:8 candy:6
nougat | food.sweet | candy:7 almond:5
licorice | food.sweet | candy:8 black:5
gumdrop | food.sweet | candy:8 gum:5
jellybean | food.sweet | candy:8 jelly:6 bean:4
chewinggum | food.sweet | gum:9 chew:7 bubble:5
bubblegum | food.sweet | gum:9 bubble:7 pink:5 chew:6
praline | food.sweet | chocolate:7 nut:6
butterscotch | food.sweet | caramel:8 toffee:8
cotton | material.other | candy:3
candyfloss | food.sweet | cottoncandy:9 fair:6 sugar:7 pink:5 carnival:6
cottoncandy | food.sweet | candyfloss:9 carnival:6 sugar:6
churro | food.sweet | donut:7 cinnamon:6 sugar:5
granola | food.staple | oat:8 cereal:7 yogurt:6 breakfast:6
muesli | food.staple | granola:9 oat:8 cereal:7
cornflakes | food.staple | cereal:9 milk:6 corn:6 breakfast:6
bran | food.staple | cereal:7 oat:6 wheat:6
quinoa | food.staple | rice:7 grain:7
couscous | food.staple | rice:7 grain:6 pasta:5
barley | food.staple | wheat:8 grain:8 oat:6
rye | food.staple | wheat:8 bread:6 grain:7
risotto | food.meal | rice:8 italy:6 mushroom:5
paella | food.meal | rice:8 spain:7 seafood:6
ramen | food.meal | noodle:9 soup:7 japan:7
udon | food.meal | noodle:9 japan:6
pho | food.meal | noodle:8 soup:7
macaroni | food.meal | pasta:9 cheese:7
ravioli | food.meal | pasta:8 dumpling:6 italy:5
gnocchi | food.meal | pasta:7 potato:6 italy:5
penne | food.meal | pasta:9
fettuccine | food.meal | pasta:9 alfredo:6
meatball | food.meat | spaghetti:8 meat:7 beef:6 sauce:4
cheeseburger | food.meal | burger:9 cheese:6
nachos | food.snack | chips:7 cheese:6 salsa:7 mexico:6
quesadilla | food.meal | tortilla:8 cheese:7 mexico:6
enchilada | food.meal | tortilla:8 mexico:7 burrito:6
fajita | food.meal | tortilla:7 mexico:6 chicken:5
kebab | food.meal | skewer:8 meat:7 grill:6
skewer | object.kitchen | kebab:8 grill:5 stick:5
falafel | food.meal | chickpea:8 pita:7 hummus:6
pita | food.staple | bread:7 hummus:6 falafel:7
naan | food.staple | bread:8 curry:7 india:5
samosa | food.snack | india:6 pastry:5 curry:5
springroll | food.snack | dumpling:6 china:5 fried:5
eggroll | food.snack | springroll:8 egg:4
wonton | food.meal | dumpling:8 soup:6 china:5
tempura | food.meal | fried:7 japan:6 shrimp:6
teriyaki | food.seasoning | sauce:7 japan:6 chicken:5
stirfry | food.meal | wok:8 noodle:5 vegetable:5
wok | object.kitchen | stirfry:8 pan:7 china:4
casserole | food.meal | stew:7 oven:6 dish:5
goulash | food.meal | stew:8 beef:5 hungary:5
chowder | food.meal | soup:9 clam:7 seafood:5
gumbo | food.meal | stew:7 okra:6 soup:6
chili | food.meal | stew:5
lasagne | food.meal | lasagna:9 pasta:7
quiche | food.meal | egg:7 pie:6 pastry:5 cheese:5
souffle | food.meal | egg:6 oven:5 france:5
fondue | food.meal | cheese:8 chocolate:5 switzerland:6
jerky | food.meat | beef:7 meat:7 dried:6
salami | food.meat | sausage:8 pepperoni:8 pizza:5
pepperoni | food.meat | pizza:9 salami:8 sausage:6
prosciutto | food.meat | ham:8 italy:6
chorizo | food.meat | sausage:8 spain:6 spicy:5
brisket | food.meat | beef:8 barbecue:7
ribs | food.meat | barbecue:8 pork:7 rib:6
roast | food.meat action.make | oven:7 beef:6 turkey:6 chicken:6 dinner:6
drumstick | food.meat object.music | chicken:7 drum:7 turkey:6
nugget | food.meat | chicken:8 gold:5
wings | food.meat | chicken:7 wing:7 spicy:4
mutton | food.meat | lamb:8 sheep:7
venison | food.meat | deer:8 meat:7
veal | food.meat | calf:8 beef:7
caviar | food.meat | fish:6 egg:6 luxury:7 sturgeon:6
lox | food.meat | salmon:9 bagel:7
calamari | food.meat | squid:9 fried:6 seafood:6
sashimi | food.meal | sushi:9 fish:7 raw:7 japan:6
frittata | food.meal | omelet:8 egg:7
pancetta | food.meat | bacon:8 italy:6
toastie | food.meal | sandwich:8 toast:7 cheese:5
panini | food.meal | sandwich:8 italy:5 grill:5
sub | food.meal | sandwich:6
brioche | food.staple | bread:8 butter:6 france:5
sourdough | food.staple | bread:9 yeast:6
ciabatta | food.staple | bread:9 italy:5
crumpet | food.staple | muffin:6 butter:6 tea:4
pretzel | food.snack | bread:4
toasted | quality.other | toast:8 brown:4 warm:4
butterfly | animal.small.insect | moth:8
icecube | object.kitchen | ice:9 cube:7 drink:5 cold:5
cube | quality.other | square:7 box:6 dice:6 ice:5
sushi | food.meal | sashimi:9 roll:5
lemonade | drink.cold | lime:5
cocktail | drink.alcohol | martini:8 drink:7 party:5 bar:6
martini | drink.alcohol | cocktail:8 olive:5 gin:7
whiskey | drink.alcohol | whisky:9 bourbon:8 scotland:5 bar:5
whisky | drink.alcohol | whiskey:9
bourbon | drink.alcohol | whiskey:8
vodka | drink.alcohol | russia:6 cocktail:6 gin:6
gin | drink.alcohol | tonic:8 martini:7 vodka:6
rum | drink.alcohol | pirate:7 cocktail:5 sugar:4
tequila | drink.alcohol | mexico:7 lime:6 cactus:4
brandy | drink.alcohol | cognac:9 wine:5
cognac | drink.alcohol | brandy:9 france:5
sake | drink.alcohol | japan:7 rice:6
ale | drink.alcohol | beer:9 pub:6
lager | drink.alcohol | beer:9 ale:7
stout | drink.alcohol | beer:8 ale:7 ireland:4
mead | drink.alcohol | honey:8 viking:5
punch | drink.cold action.move | fruit:4 party:4 fight:7 boxing:7
tonic | drink.cold | gin:8 soda:6
lemon | food.fruit | lemonade:9
limeade | drink.cold | lemonade:9 lime:9
cordial | drink.cold | juice:7 squash:6
squash | drink.cold | cordial:6
iced | quality.temp | ice:8 cold:6 tea:4 frozen:5
icedtea | drink.cold | tea:8 iced:8 lemon:5 summer:5
frappe | drink.cold | coffee:7 iced:6 milkshake:6
mocha | drink.hot | coffee:8 chocolate:7 latte:7
americano | drink.hot | coffee:9 espresso:8
macchiato | drink.hot | espresso:8 coffee:8 latte:6
decaf | drink.hot | coffee:8 caffeine:7
chai | drink.hot | tea:9 spice:6 india:5
matcha | drink.hot | tea:8 green:6 japan:6
herbal | drink.hot | tea:7 herb:7 chamomile:7
chamomile | drink.hot | tea:8 herbal:8 sleep:4 flower:4
earlgrey | drink.hot | tea:9
peppermint | food.seasoning | mint:9 tea:5 candy:5
espresso | drink.hot | barista:7
barista | person.job | coffee:8 cafe:8 latte:6 espresso:7
hotchocolate | drink.hot | cocoa:9 chocolate:8 marshmallow:6 winter:5
broth | food.meal | stock:8
stock | food.meal | broth:8 soup:7
water | drink.cold | mineral:5
sparkling | quality.other | fizzy:8 bubble:7 champagne:6 glitter:4
fizzy | quality.other | soda:8 bubble:7 sparkling:8
lemonsqueezer | object.kitchen | lemon:8 juice:6
kombucha | drink.cold | tea:7 fizzy:6
cider | drink.alcohol | apple:5
soup | food.meal | stock:6
cereal | food.staple | cornflakes:8
picnic | food.mealtime | sandwich:5
brunch | food.mealtime | breakfast:8 lunch:8 pancake:5 weekend:5
snack | food.snack | munchies:7
munchies | food.snack | snack:7 hungry:6
leftovers | food.meal | dinner:6 fridge:6
appetizer | food.mealtime | starter:9 meal:6 snack:5
starter | food.mealtime | appetizer:9
entree | food.mealtime | dinner:6 meal:7 main:5
banquet | food.mealtime | feast:9 dinner:6 king:4
buffet | food.mealtime | feast:6 restaurant:6 meal:5
recipe | object.paper | chef:6
ingredient | food.meal | recipe:8 cook:6 flour:4
cookbook | object.paper | recipe:9 cook:7 chef:6 kitchen:5
dessertspoon | object.kitchen | spoon:9 dessert:6
teaspoon | object.kitchen | spoon:9 tea:5 sugar:4
tablespoon | object.kitchen | spoon:9
spatula | object.kitchen | pan:7 cook:6 pancake:6 flip:5
whisk | object.kitchen | egg:7 beat:6 cream:6 mix:6
rollingpin | object.kitchen | dough:8 bake:7 pastry:6
colander | object.kitchen | strainer:9 pasta:6 sink:4
strainer | object.kitchen | colander:9 sieve:9
sieve | object.kitchen | strainer:9 flour:6
grater | object.kitchen | cheese:8 carrot:5
peeler | object.kitchen | peel:9 potato:7 carrot:5
cleaver | object.kitchen | knife:8 butcher:8 chop:7
corkscrew | object.kitchen | cork:9 wine:8 bottle:6
tongs | object.kitchen | grill:7 barbecue:6 salad:4
blender | object.kitchen | milkshake:6
juicer | object.kitchen | juice:9 orange:6 blender:6
mixer | object.kitchen | blender:7 bake:6 cake:5 whisk:6
cauldron | object.kitchen | pot:5
lunchbox | object.container | lunch:9 sandwich:6 school:5
thermos | object.container | flask:9 coffee:6 tea:6 soup:4
flask | object.container | thermos:9 bottle:7 laboratory:5
jug | object.container | pitcher:9 water:6 milk:6
pitcher | object.container | jug:9 water:6 baseball:5
carton | object.container | box:7 milk:7 juice:6
tin | object.container material.metal | can:9 metal:6 soup:4 sardine:5
can | object.container | tin:9 soda:6 soup:5
tray | object.kitchen | plate:7 waiter:6 serve:5
platter | object.kitchen | plate:8 tray:7 feast:4
napkin | object.kitchen | serviette:9 table:6 tablecloth:6
tablecloth | object.kitchen | table:8 napkin:6 picnic:5
placemat | object.kitchen | table:6 plate:5
coaster | object.kitchen | cup:6 mug:6 table:4 rollercoaster:3
chopstick | object.kitchen | chopsticks:9 sushi:6
straw | object.kitchen | drink:5 milkshake:6 smoothie:5
toothpick | object.kitchen | stick:6 tooth:5 olive:3

# ───────────── BIG EXPANSION · HOME, TOOLS, TECH, CLOTHING ─────────────
armchair | object.furniture | chair:9 sofa:7 cushion:5
recliner | object.furniture | armchair:8 chair:7 sofa:6
ottoman | object.furniture | footstool:8 stool:7 sofa:5
footstool | object.furniture | stool:8 ottoman:8
beanbag | object.furniture | chair:6 cushion:6
hammock | object.furniture | swing:6 beach:5 nap:6 palm:4 relax:5
bunk | object.furniture | bed:8 ladder:4
futon | object.furniture | sofa:7 bed:7 mattress:6
crib | object.furniture | nursery:6
dresser | object.furniture | drawer:8 wardrobe:7 mirror:5
nightstand | object.furniture | bedside:8 lamp:6 bed:6 drawer:5
bedside | object.furniture | nightstand:8 bed:6
bookcase | object.furniture | shelf:8 book:7 bookshelf:9
bookshelf | object.furniture | bookcase:9 shelf:8 book:7 library:6
cabinet | object.furniture | cupboard:9 drawer:7 kitchen:5
sideboard | object.furniture | cabinet:7 cupboard:6
counter | object.furniture | kitchen:6 shop:5 table:5
workbench | object.furniture | tool:7 carpenter:6 table:6
mantelpiece | object.home | fireplace:8 mantel:9
mantel | object.home | fireplace:8 mantelpiece:9
bannister | object.home | stairs:8 railing:8
railing | object.home | bannister:8 fence:6 stairs:5
balcony | object.home | terrace:7 window:5 apartment:6 view:5
terrace | object.home place.outdoor | balcony:7 patio:7 garden:5
patio | place.outdoor | terrace:7 garden:6 barbecue:5
porch | object.home | veranda:8 door:6 house:5
veranda | object.home | porch:8 terrace:6
hallway | place.room | corridor:9 door:5 house:4
corridor | place.room | hallway:9 school:3 hotel:4
lobby | place.room | hotel:7 entrance:6 reception:7
basement | place.room | cellar:9 underground:6 stairs:4
loft | place.room | attic:9 apartment:5
nursery | place.room | baby:8 crib:7 cradle:6 garden:3
pantry | place.room | larder:9 kitchen:7 food:6 cupboard:6
larder | place.room | pantry:9
laundry | place.room | wash:7 washingmachine:8 clothes:6 dryer:6
washingmachine | object.kitchen | laundry:8 wash:7 clothes:6 dryer:7
dryer | object.kitchen | laundry:6 washingmachine:7 hair:4
dishwasher | object.kitchen | dish:7 wash:6 kitchen:6 sink:5
toaster | object.kitchen | grill:4
kettle | object.kitchen | whistle:5
iron | object.tool | ironing:8 clothes:5 shirt:5 wrinkle:6
ironing | action.daily | iron:8 clothes:6 laundry:6
heater | object.home | radiator:8 warm:7 heat:7 winter:5
radiator | object.home | heater:8 warm:6
furnace | object.home | heater:7 boiler:7 fire:6
boiler | object.home | furnace:7 heater:6 hot:5 water:4
fan | object.home | breeze:6 cool:6 wind:5 blade:4 spin:4
airconditioner | object.home | fan:7 cool:8 cold:6 summer:5
thermostat | object.home | temperature:8 heater:6 thermometer:6
chandelier | object.light | crystal:5
lampshade | object.light | lamp:9 shade:6
candlestick | object.light | candle:9 holder:5
candleholder | object.light | candlestick:9 candle:8
nightlight | object.light | lamp:7 night:7 child:4
spotlight | object.light | light:7 stage:7 theater:6 torch:5
lightbulb | object.light | bulb:9 lamp:8 idea:6 light:7
socket | object.tech | plug:8 electricity:7 wall:4
plug | object.tech | socket:8 cable:6 electricity:6
cable | object.tech | wire:9 plug:6 rope:4
switch | object.tech | button:7 light:5 lamp:5
button | object.clothing.wear object.tech | switch:7 shirt:5 press:6 coat:4
doorknob | object.home | door:8 handle:9 knock:4
doormat | object.home | door:7 welcome:7 rug:6
letterbox | object.home | mailbox:9 letter:7 mail:7
mailbox | object.home | letterbox:9 mail:8 letter:7 postman:6
keyhole | object.home | key:9 lock:8 door:6
peephole | object.home | door:6 eye:4 spy:4
shutter | object.home | window:7 blind:7
blind | object.home | curtain:7 shutter:7 window:6
wallpaper | object.home | wall:8 paint:5 pattern:5
skylight | object.home | window:8 roof:7 sky:5
gutter | object.home | roof:6 rain:6 drain:6
drain | object.home | sink:6 pipe:7 gutter:6 plumber:6
pipe | object.home object.music | drain:7 plumber:8 water:5 tube:7
faucet | object.kitchen | tap:9 sink:8 water:6
tap | object.kitchen | faucet:9
toilet | object.home | bathroom:9 flush:8 plumber:5
bathtub | object.home | bath:9 bubble:5 bathroom:7
showerhead | object.home | shower:9
sponge | object.home | bath:5
loofah | object.home | sponge:8 bath:6
towelrack | object.home | towel:8 bathroom:6
toothpaste | object.misc | toothbrush:9 tooth:8 mint:5 brush:5
floss | object.misc | tooth:8 toothbrush:6 dentist:6
mouthwash | object.misc | mint:6 tooth:6 toothpaste:6
razor | object.misc | shave:9 beard:7 blade:6
shave | action.daily | razor:9 beard:8 face:5
deodorant | object.misc | smell:5 sweat:6
perfume | object.misc | scent:9 smell:8 flower:5 cologne:8
cologne | object.misc | perfume:8 scent:7
lotion | object.misc | cream:7 sunscreen:6 skin:6
lipstick | object.misc | makeup:8 lip:7 red:5 kiss:4
makeup | object.misc | lipstick:8 mirror:5 face:6 mascara:7
mascara | object.misc | makeup:7 eyelash:7
nailpolish | object.misc | nail:8 makeup:6 paint:5
hairbrush | object.misc | brush:9 hair:8 comb:7
hairdryer | object.misc | hair:7 dryer:8 hot:4
hairspray | object.misc | hair:7 spray:6
shampoo | object.misc | conditioner:8 hair:7 soap:6 bubble:5
conditioner | object.misc | shampoo:8 hair:6
tissue | object.misc | sneeze:7 nose:6 cold:4 cry:4
plaster | object.misc material.other | bandage:9 cut:6 wall:4
bandage | object.misc | plaster:9 wound:7 cut:6 mummy:5 nurse:5
pill | object.misc | medicine:8 tablet:7 doctor:5
thermometer | object.tech | fever:7
wheelchair | object.misc | hospital:6 wheel:6 chair:5
crutch | object.misc | leg:6 broken:6 hospital:5
stethoscope | object.tech | doctor:9 heart:6 nurse:6
syringe | object.tool | needle:9 doctor:6 vaccine:7
vaccine | object.misc | syringe:7 virus:7 doctor:6
cushion | object.furniture | pillowcase:5
pillowcase | object.furniture | pillow:9 bed:6
duvet | object.furniture | quilt:9 blanket:9 bed:7
quilt | object.furniture | duvet:9 blanket:9 sew:5
eiderdown | object.furniture | duvet:9 feather:6
alarmclock | object.tech | alarm:9 clock:9 wake:7 morning:6
calendar | object.paper | diary:6
hourglass | object.tech | egg:2
stopwatch | object.tech | timer:9 race:6 clock:6
sundial | object.tech | clock:7 sun:7 time:6 shadow:6
metronome | object.music | tempo:8 rhythm:8 piano:5 tick:6
remote | object.tech | television:7 control:6 button:5
remotecontrol | object.tech | remote:9 television:7
television | object.tech | sitcom:5
speaker | object.tech | sound:7 loud:5 music:6 radio:5 microphone:6
headphones | object.tech | music:7 ear:7 earphones:9 listen:6
earphones | object.tech | headphones:9 ear:6
earbuds | object.tech | earphones:9 headphones:8
stereo | object.tech | speaker:7 radio:6 music:6
record | object.music | vinyl:9 album:7 music:6 song:5
vinyl | object.music | record:9 album:6
cassette | object.music | tape:8 music:6 record:6
tape | object.tool object.music | cassette:7 sticky:7 glue:5
cd | object.music | disc:8 album:6 music:6
disc | object.tech | cd:8 dvd:8 record:5 round:4
dvd | object.tech | disc:8 movie:7 cd:7
videogame | object.tech activity.leisure | console:8 gamer:8 controller:7 game:8
console | object.tech | videogame:8 controller:8 gamer:6
controller | object.tech | console:8 joystick:7 remote:5 gamepad:9
joystick | object.tech | controller:7 arcade:6
gamepad | object.tech | controller:9 console:7
arcade | place.building.public | videogame:7 joystick:6 coin:4
gamer | person.job | videogame:8 console:6 controller:5
printer | object.tech | paper:7 ink:7 computer:6 print:8
print | action.make | printer:8 ink:6 paper:5
scanner | object.tech | printer:7 copy:6 barcode:5
copier | object.tech | printer:7 copy:7 office:5
mouse | object.tech | mousepad:7
mousepad | object.tech | mouse:7 computer:5
webcam | object.tech | camera:8 computer:6 video:6
smartphone | object.tech | phone:9 mobile:9 app:7 screen:6
mobile | object.tech | phone:9 smartphone:9
cellphone | object.tech | phone:9 mobile:9
telephone | object.tech | phone:9 call:8 ring:5
app | object.tech | smartphone:7 phone:6 game:4 download:6
download | object.tech | internet:7 app:6 file:6 upload:7
upload | object.tech | download:7 internet:6 video:5
website | object.tech | internet:8 online:8 web:8 page:5
online | object.tech | internet:9 website:8 offline:6
offline | object.tech | online:6 internet:5
wifi | object.tech | internet:8 router:8 signal:6
router | object.tech | wifi:8 internet:7 modem:8
modem | object.tech | router:8 internet:7
password | object.tech | lock:6 secret:7 key:6 login:8 username:7
login | object.tech | password:8 username:7 account:6
username | object.tech | password:7 login:7
account | object.tech | login:6 bank:5 profile:6
profile | object.tech | account:6 picture:4
emoji | object.tech | smile:6 text:6 face:5 message:5
hashtag | object.tech | tweet:6 social:6
blog | object.tech | website:7 post:6 write:5
video | object.tech | camera:7 film:7 movie:6 youtube:6
youtube | object.tech | video:7 channel:6
channel | object.tech | television:7 youtube:6 canal:4
podcast | object.tech | radio:7 listen:6 episode:6 microphone:5
streaming | object.tech | video:6 online:6 movie:5
battery | object.tech | charger:7
charger | object.tech | battery:7 phone:6 cable:6 plug:6
calculator | object.tech | math:8 number:7 add:5
keyboard | object.tech | typing:6
typewriter | object.tech | keyboard:7 type:7 paper:5 letter:4
type | action.daily | keyboard:7 typewriter:7 write:5
pixel | object.tech | screen:6 image:6 square:5 retro:5
hologram | object.tech | laser:6 future:5 image:5
laser | object.tech | beam:7 light:6 robot:4 hologram:6
beam | quality.other | light:7 laser:7 ray:8 lighthouse:6
ray | quality.other | beam:8 light:6 sun:5 stingray:3
satellite | vehicle.space | dish:4
antenna | object.tech | radio:6 signal:7 satellite:6 television:5
radar | object.tech | signal:7 plane:5 sonar:7
sonar | object.tech | radar:7 submarine:7 dolphin:4 echo:6
robotarm | object.tech | robot:8 machine:6
gadget | object.tech | device:9 tool:5 gizmo:9
device | object.tech | gadget:9 machine:5 phone:4
gizmo | object.tech | gadget:9
toolbox | object.tool | tool:9 hammer:7 wrench:6
pliers | object.tool | wrench:7 tool:7 wire:5
chisel | object.tool | hammer:6 carve:7 wood:6 sculpture:6 stone:4
mallet | object.tool | hammer:9
sledgehammer | object.tool | hammer:9 mallet:7
crowbar | object.tool | lever:7 hammer:5 tool:6
lever | object.tool | crowbar:7 handle:5 push:4
spanner | object.tool | wrench:9
hacksaw | object.tool | saw:9 metal:5
jigsaw | object.toy object.tool | puzzle:9 piece:7 saw:5
sandpaper | object.tool | wood:6 smooth:7 sand:4
glue | object.tool | sticky:8 paste:7 tape:6
paste | object.tool | glue:7 toothpaste:5
stapler | object.tool | staple:9 paper:6 office:6
staple | object.tool | stapler:9 paper:5
paperclip | object.tool | paper:7 clip:8 office:5 stapler:6
clip | object.tool | paperclip:8 hair:4
pushpin | object.tool | pin:9 thumbtack:9 board:5
thumbtack | object.tool | pushpin:9 pin:8
ruler | object.tool person.royal | measure:8 inch:7 straight:6 king:6 queen:5
tapemeasure | object.tool | ruler:8 measure:8 inch:6
measure | action.make | ruler:8 inch:6 size:6
level | object.tool | flat:6 straight:6 bubble:4
ladder | object.tool | stepladder:9
stepladder | object.tool | ladder:9
wheelbarrow | object.tool | garden:7 shovel:6 wheel:6 dirt:5
rake | object.tool | leaf:7 garden:6 autumn:5 hay:4
hoe | object.tool | garden:7 rake:7 soil:5
trowel | object.tool | garden:6 shovel:7 dig:5 soil:5
pitchfork | object.tool | hay:8 farm:7 fork:6 farmer:6
scythe | object.tool | wheat:6 harvest:7 sickle:8
sickle | object.tool | scythe:8 harvest:6 moon:3
shears | object.tool | scissors:9 hedge:7 sheep:6 garden:5
hedge | nature.plant.other | bush:8 shears:7 garden:6 fence:5
bush | nature.plant.other | hedge:8 shrub:9 tree:5 berry:4
shrub | nature.plant.other | bush:9 hedge:7
hose | object.tool | garden:7 water:7 sprinkler:7 firefighter:6
sprinkler | object.tool | hose:7 lawn:7 water:6 garden:6
wateringcan | object.tool | water:8 garden:7 flower:6 plant:6
flowerpot | object.container | pot:8 plant:7 flower:7 soil:5
birdhouse | object.home | bird:8 nest:7 tree:5
birdbath | object.home | bird:7 water:5 garden:5
lawnmower | object.tool | lawn:9 mow:9 grass:8 garden:6
mow | action.make | lawnmower:9
shovel | object.tool | snowplow:4
snowplow | vehicle.land | snow:8 shovel:6 truck:5 winter:5
axe | object.tool | lumberjack:7
lumberjack | person.job | axe:8 wood:7 log:7 tree:7 forest:6 flannel:5
chainsaw | object.tool | saw:8 tree:6 lumberjack:7 wood:6
pickaxe | object.tool | miner:8 mine:7 dig:7 rock:6
anvil | object.tool | blacksmith:9 hammer:7 iron:6
blacksmith | person.job | anvil:9 forge:9 hammer:8 iron:7 horseshoe:6
forge | place.building.public | blacksmith:9 fire:6 iron:6 anvil:7
bucket | object.container | spill:4
spill | action.daily | pour:6 mess:6 milk:4
pour | action.daily | water:6 jug:6 rain:5 spill:6
broom | object.tool | dustpan:8
dustpan | object.tool | broom:8 dust:7
duster | object.tool | dust:8 feather:5 clean:6
cleaner | person.job | clean:8 mop:6 vacuum:7
detergent | object.misc | soap:8 laundry:7 wash:7
bleach | object.misc | clean:7 white:6 detergent:6
basket | object.container | laundry:5
hamper | object.container | basket:8 laundry:7 picnic:6
hanger | object.home | clothes:8 coat:7 wardrobe:7
coatrack | object.home | coat:8 hanger:7 hat:5
umbrellastand | object.home | umbrella:9
suitcase | object.container | packing:6
backpack | object.container | rucksack:9 schoolbag:8
rucksack | object.container | backpack:9 hike:6
schoolbag | object.container | backpack:8 school:7
briefcase | object.container | office:7 business:7 suitcase:6 bag:6
handbag | object.container | purse:9 bag:8
satchel | object.container | bag:8 school:5 backpack:6
pouch | object.container | bag:6
sack | object.container | bag:8 potato:4 santa:5
crate | object.container | box:8 wooden:5
envelope | object.paper | stamp:6
parcel | object.container | package:9 box:8 mail:7 postman:6
package | object.container | parcel:9 box:8 delivery:7
gift | object.misc | ribbon:6
ribbon | object.decoration | bow:7 gift:6 hair:5 present:5
wrappingpaper | object.paper | gift:8 present:7 wrap:7 christmas:5
tote | object.container | bag:8 shopping:6
wallet | object.container | card:5
keychain | object.misc | key:9 keyring:9
keyring | object.misc | keychain:9 key:8
lanyard | object.misc | badge:7 keychain:5
badge | object.misc | police:6 sheriff:6 lanyard:6 pin:5
sticker | object.paper | label:7 glue:5 sticky:6
label | object.paper | sticker:7 tag:8 price:5
tag | object.paper | label:8 price:6 game:4
price | object.misc | cost:9 money:7 tag:6 shop:5
receipt | object.paper | shop:6 price:6 money:5 bill:7
bill | object.paper | receipt:7 money:6 invoice:8 beak:3
coupon | object.paper | discount:8 voucher:9 shop:5
voucher | object.paper | coupon:9 gift:5

# ───────────── BIG EXPANSION · CLOTHING, MATERIALS, COLOURS, SHAPES ─────────────
blouse | object.clothing.wear | shirt:8 dress:5 top:6
tshirt | object.clothing.wear | shirt:9
hoodie | object.clothing.wear | sweatshirt:9 hood:8 jumper:7 sweater:7
sweatshirt | object.clothing.wear | hoodie:9 sweater:8
jumper | object.clothing.wear | sweater:9 cardigan:7
cardigan | object.clothing.wear | sweater:8 jumper:7 button:5
vest | object.clothing.wear | waistcoat:9 jacket:5 shirt:5
waistcoat | object.clothing.wear | vest:9 suit:6
blazer | object.clothing.wear | jacket:8 suit:7 school:4
suit | object.clothing.wear | tie:8 jacket:7 blazer:7 wedding:5 business:6
tuxedo | object.clothing.wear | suit:9 bowtie:8 wedding:6 penguin:5
tie | object.clothing.wear | suit:8 necktie:9 shirt:6 knot:5
necktie | object.clothing.wear | tie:9
bowtie | object.clothing.wear | tie:8 tuxedo:8 bow:6
overcoat | object.clothing.wear | coat:9 winter:5
trenchcoat | object.clothing.wear | coat:9 detective:6 rain:4
parka | object.clothing.wear | coat:8 hood:6 winter:6
anorak | object.clothing.wear | raincoat:8 parka:7
poncho | object.clothing.wear | raincoat:7 cape:6 mexico:4
robe | object.clothing.wear | gown:7 bathrobe:8 wizard:5 judge:4
bathrobe | object.clothing.wear | robe:8 towel:6 bath:6 dressinggown:9
dressinggown | object.clothing.wear | bathrobe:9 robe:8
pajamas | object.clothing.wear | pyjamas:9 sleep:7 bed:6 nightgown:7
pyjamas | object.clothing.wear | pajamas:9
nightgown | object.clothing.wear | pajamas:7 dress:5 sleep:5
gown | object.clothing.wear | dress:9 ball:4 wedding:5 robe:6
tutu | object.clothing.wear | ballet:8 dress:5 skirt:6
kilt | object.clothing.wear | skirt:7 scotland:7 tartan:7
sarong | object.clothing.wear | skirt:6 beach:5
apron | object.clothing.wear | chef:7 kitchen:6 cook:6 bake:5
uniform | object.clothing.wear | school:6 soldier:6 police:6 nurse:5
overalls | object.clothing.wear | dungarees:9 farmer:6 jeans:5
dungarees | object.clothing.wear | overalls:9
leggings | object.clothing.wear | tights:8 pants:7
tights | object.clothing.wear | leggings:8 stockings:8 ballet:4
stockings | object.clothing.foot | tights:8 sock:7 christmas:4
trousers | object.clothing.wear | pants:9 jeans:7
denim | material.other | jeans:9 cotton:5 blue:4
corduroy | material.other | fabric:7 trousers:5
swimwear | object.clothing.wear | swimsuit:9 bikini:7
wetsuit | object.clothing.wear | surf:7 dive:7 scuba:7 swimsuit:6
trunks | object.clothing.wear | swimsuit:7 shorts:7
underwear | object.clothing.wear | pants:6 sock:5 bra:6
bra | object.clothing.wear | underwear:6
belt | object.clothing.wear | buckle:8 pants:6 jeans:5 karate:4
buckle | object.clothing.wear | belt:8 shoe:4
suspenders | object.clothing.wear | braces:8 trousers:6 belt:5
braces | object.clothing.wear | suspenders:8 tooth:6 dentist:5
glove | object.clothing.wear | mitt:8
mitt | object.clothing.wear | mitten:8 glove:8 baseball:6
earmuffs | object.clothing.head | ear:7 winter:6 cold:5 scarf:5 hat:5
beanie | object.clothing.head | hat:9 wool:6 winter:6
beret | object.clothing.head | hat:8 france:6 artist:5
bonnet | object.clothing.head | hat:8 baby:5 car:4
fedora | object.clothing.head | hat:9 detective:5
sombrero | object.clothing.head | hat:9 mexico:8
turban | object.clothing.head | hat:6 head:6
headband | object.clothing.head | hair:7 sweat:5 tennis:4
bandana | object.clothing.head | scarf:7 cowboy:5 pirate:5
visor | object.clothing.head | cap:8 sun:6 helmet:5
crown | object.jewelry | gold:5
helmet | object.clothing.head | visor:5
hardhat | object.clothing.head | helmet:8 builder:8 construction:7
goggles | object.clothing.head | glasses:7 swim:6 ski:5 snorkel:6
monocle | object.clothing.head | glasses:7 lens:6
eyepatch | object.clothing.head | pirate:9 eye:7 patch:6
sneaker | object.clothing.foot | shoe:9 trainer:9 run:6
trainer | object.clothing.foot person.job | sneaker:9 shoe:8 coach:7 gym:5
loafer | object.clothing.foot | shoe:8
moccasin | object.clothing.foot | shoe:7 slipper:7
clog | object.clothing.foot | shoe:7 wooden:6 holland:6
flipflop | object.clothing.foot | sandal:9 beach:7 summer:5
wellies | object.clothing.foot | wellington:9 boot:8 rain:7 puddle:7 mud:6
wellington | object.clothing.foot | boot:8 wellies:9
stiletto | object.clothing.foot | heel:9 shoe:8
highheels | object.clothing.foot | heel:9 stiletto:9 shoe:8
skates | object.clothing.foot | skate:9 ice:6 rink:7
rollerskate | object.clothing.foot | skate:9 wheel:6 rink:6
shoelace | object.clothing.foot | lace:9 shoe:9 knot:6
lace | material.other object.clothing.foot | shoelace:9 knot:5 fabric:5
sole | body.part object.clothing.foot | shoe:7 foot:7 fish:3
pocket | object.clothing.wear | coat:5 jeans:5 wallet:5 pants:5
zipper | object.clothing.wear | zip:9 jacket:6 button:6
zip | object.clothing.wear | zipper:9
collar | object.clothing.wear | shirt:6 dog:6 neck:5
sleeve | object.clothing.wear | shirt:7 arm:7 jacket:5
hem | object.clothing.wear | skirt:5 sew:6
patch | object.clothing.wear | sew:6 jeans:4 eyepatch:6
brooch | object.jewelry | pin:7 jewel:6 necklace:5
pendant | object.jewelry | necklace:9 locket:8 chain:6
locket | object.jewelry | pendant:8 necklace:8 photo:5
bangle | object.jewelry | bracelet:9
anklet | object.jewelry | bracelet:8 ankle:7
cufflink | object.jewelry | shirt:6 suit:5 sleeve:6
tiara | object.jewelry | diadem:9
diadem | object.jewelry | tiara:9 crown:8
amethyst | material.gem | gem:8 purple:7 crystal:6 jewel:7
topaz | material.gem | gem:8 jewel:7 yellow:5
opal | material.gem | gem:8 jewel:7 rainbow:4
jade | material.gem color.green | gem:7 green:7 china:5
garnet | material.gem | gem:8 red:6 ruby:6
quartz | material.gem | crystal:8 gem:6 rock:5
onyx | material.gem | gem:7 black:6
agate | material.gem | gem:7 stone:6
granite | material.other | stone:8 rock:8 marble:6 hard:5
limestone | material.other | stone:8 rock:7 cave:5
sandstone | material.other | stone:8 sand:7 rock:7
slate | material.other | stone:7 roof:5 grey:5 chalkboard:5
concrete | material.other | cement:9 building:6 road:5 hard:5
cement | material.other | concrete:9 brick:6
asphalt | material.other | road:8 tar:8 street:6
tar | material.other | asphalt:8 black:5 sticky:5 road:5
gravel | material.other | stone:7 pebble:8 road:5 path:5
plywood | material.other | wood:9 plank:7
timber | material.other | wood:9 lumber:9 log:7
lumber | material.other | timber:9 wood:9
bamboo | material.other | wood:4
cork | material.other | wine:6 bottle:6 board:4
canvas | material.other | tent:5 sail:5
linen | material.other | fabric:8 cotton:7 sheet:6
velvet | material.other | fabric:8 soft:7 smooth:5 red:3
satin | material.other | silk:8 fabric:7 smooth:6
nylon | material.other | fabric:6 stockings:6 plastic:5
polyester | material.other | fabric:7 nylon:7
suede | material.other | leather:8 shoe:5
fur | body.part | coat:4
feather | animal.bird.other | down:6
down | quality.other | up:7 feather:6 below:5 fall:5
aluminum | material.metal | aluminium:9 metal:8 foil:7 can:5
aluminium | material.metal | aluminum:9
foil | material.metal | aluminum:7 tin:6 wrap:5 kitchen:4
lead | material.metal | metal:7 pencil:6 heavy:6 leader:4
zinc | material.metal | metal:7
nickel | material.metal | metal:7 coin:6
platinum | material.metal | gold:7 silver:7 metal:7 rich:5
titanium | material.metal | metal:8 strong:6 steel:6
chrome | material.metal | metal:7 shiny:7 silver:6
brass | material.metal | metal:7 trumpet:6 gold:5
pewter | material.metal | metal:7 tin:7
rust | material.metal | iron:8 metal:6 orange:5 old:5
magnetite | material.metal | magnet:8 iron:7
glassware | object.kitchen | glass:8 cup:5
porcelain | material.other | china:8 ceramic:8 pottery:7 teacup:6 plate:5
ceramic | material.other | porcelain:8 pottery:8 clay:7 tile:6
pottery | material.other | clay:8 vase:7 ceramic:8
tile | material.other | floor:6 roof:5 ceramic:6 bathroom:5
mosaic | activity.art | tile:8 pattern:6 art:5
crimson | color.red | red:9 scarlet:8
scarlet | color.red | red:9 crimson:8
maroon | color.red | red:8 burgundy:8 brown:5
burgundy | color.red | maroon:8 wine:6 red:7
cherryred | color.red | red:9 cherry:7
coral | color.red | pink:6 orange:5
salmonpink | color.red | pink:8 salmon:6
fuchsia | color.purple | magenta:9 pink:8 purple:7
magenta | color.purple | fuchsia:9 pink:7
lilac | color.purple | lavender:8 purple:8 violet:7
mauve | color.purple | lilac:7 purple:7
indigo | color.purple color.blue | violet:7 blue:7 purple:6 rainbow:5
azure | color.blue | blue:9 sky:7
cyan | color.blue | blue:8 turquoise:7 teal:7
cobalt | color.blue | blue:8 navy:6
aqua | color.blue | turquoise:8 cyan:8 water:6 blue:7
skyblue | color.blue | blue:9 sky:8
babyblue | color.blue | blue:8 pastel:7
emeraldgreen | color.green | green:9 emerald:8
olivegreen | color.green | olive:8 green:8
mint | color.green | green:6
khaki | color.brown | beige:7 brown:6 green:4 army:5
beige | color.brown | tan:8 cream:7 brown:6
cream | color.white | beige:6 white:6
ivory | color.white | white:7 cream:6
ochre | color.yellow color.brown | yellow:6 brown:6 earth:4
amber | color.orange | orange:6 yellow:5 honey:5
peach | color.orange | orange:6 pink:5
apricot | color.orange | orange:6
tangerineorange | color.orange | orange:9 tangerine:7
mustard | color.yellow | yellow:7
lemonyellow | color.yellow | yellow:9 lemon:7
charcoal | color.grey material.other | grey:8 black:7 coal:7 drawing:5
silvergrey | color.grey | grey:8 silver:8
ebony | color.black | black:8 piano:5 wood:4
jet | color.black | black:6
pastel | color.white | pale:8 soft:6 pink:5 color:6
pale | quality.other | pastel:8 white:6 light:5 ghost:4
neon | color | bright:8 light:6 sign:6 glow:7 pink:4
rainbow | weather.precip | colorful:7
colorful | quality.other | rainbow:7 bright:7 vivid:8 parrot:5
vivid | quality.other | bright:7 colorful:8
dull | quality.other | boring:7 grey:5 bright:5
shade | color | tone:7 hue:6
hue | color | color:9 shade:6 tint:8
tint | color | hue:8 shade:7
pattern | quality.other | design:7 stripes:6 spots:6 polkadot:7 tartan:6
polkadot | quality.other | spots:9 dots:8 pattern:7
tartan | quality.other | plaid:9 pattern:7 kilt:7 scotland:6
plaid | quality.other | tartan:9 pattern:7 flannel:6
checkered | quality.other | chessboard:7 pattern:7 square:6 flag:4
flannel | material.other | plaid:6 shirt:6 lumberjack:5
circle | quality.shape | round:9 ring:7 sphere:7 square:5 oval:7 wheel:5
square | quality.shape | box:6 cube:7 rectangle:8 circle:5
triangle | quality.shape | pyramid:6 square:5 three:5
rectangle | quality.shape | square:8 box:5
oval | quality.shape | circle:7 egg:6 ellipse:9
ellipse | quality.shape | oval:9 circle:6
diamondshape | quality.shape | diamond:6
hexagon | quality.shape | six:6 beehive:5 honeycomb:6 shape:6
pentagon | quality.shape | five:6 shape:6
octagon | quality.shape | eight:6 stopsign:6 shape:6
star | quality.shape | shape:4
heartshape | quality.shape | heart:9 valentine:6
crescent | quality.shape | moon:7
spiral | quality.shape | twist:7 swirl:8 snail:5 shell:4 galaxy:4
swirl | quality.shape | spiral:8 twist:6
zigzag | quality.shape | lightning:5 line:6
line | quality.shape | straight:7 dash:6 dot:5 ruler:5
dot | quality.shape | point:8 spot:8 circle:5 polkadot:6
point | quality.shape | dot:8 sharp:5 arrow:5
curve | quality.shape | bend:8 round:6 line:5
arc | quality.shape | arch:8 curve:7 rainbow:5
sphere | quality.shape | ball:7 globe:6 round:8
cone | quality.shape | icecream:6 pine:5 traffic:4
cylinder | quality.shape | tube:8 can:6 round:5
pyramidshape | quality.shape | pyramid:9 triangle:7
shape | quality.shape | circle:6 square:6 triangle:6 form:7
round | quality.shape | circle:9 ball:6 sphere:8
flat | quality.shape | level:6 smooth:5 pancake:5

# ───────────── BIG EXPANSION · NATURE, PLACES ON EARTH, PLANTS, SKY ─────────────
continent | nature.land.region | country:7 world:6 africa:6 asia:6 europe:6 map:5
country | nature.land.region | nation:9 continent:7 flag:6 border:7 map:5
nation | nature.land.region | country:9 flag:6
border | nature.land.region | country:7 fence:5 edge:6 passport:6
region | nature.land.region | area:8 country:5 zone:7
area | nature.land.region | region:8 zone:7 space:5
zone | nature.land.region | area:7 region:7
africa | nature.land.region | continent:6 safari:6 savanna:6 lion:4 egypt:5
asia | nature.land.region | continent:6 china:6 japan:6 india:6
europe | nature.land.region | continent:6 france:6 italy:6
america | nature.land.region | continent:6 usa:8 canada:5
australia | nature.land.region | kangaroo:8 koala:6 continent:6
antarctic | nature.land.habitat | antarctica:9 polar:8 penguin:6
equator | nature.land.region | tropical:7 hot:5 earth:5
tropics | nature.land.habitat | tropical:9 equator:7 jungle:5
plateau | nature.land.relief | mesa:8 plain:6 mountain:5
mesa | nature.land.relief | plateau:8 desert:6 canyon:5
plain | nature.land.habitat | prairie:8 field:7 flat:6
prairie | nature.land.habitat | plain:8 grassland:9 bison:6 field:6
grassland | nature.land.habitat | prairie:9 savanna:8 meadow:7
steppe | nature.land.habitat | prairie:8 grassland:8
tundra | nature.land.habitat | arctic:8 cold:6 snow:5 frozen:6
taiga | nature.land.habitat | forest:7 pine:6 tundra:5
wetland | nature.land.habitat | marsh:9 swamp:8 bog:8
bog | nature.land.habitat | marsh:8 swamp:8 mud:6
mangrove | nature.land.habitat | swamp:7 tree:5 coast:5
moor | nature.land.habitat | heath:9 hill:5 fog:4
heath | nature.land.habitat | moor:9
fjord | nature.water.sea | inlet:8 norway:7 cliff:6 bay:6
inlet | nature.water.sea | bay:8 cove:8 fjord:8
cove | nature.water.sea nature.land.coast | bay:8 inlet:8 beach:6 pirate:4
gulf | nature.water.sea | bay:8 sea:6
strait | nature.water.sea | channel:7 sea:5
estuary | nature.water.fresh | river:7 delta:7 sea:5
delta | nature.water.fresh | river:7 estuary:7 nile:5
archipelago | nature.land.coast | island:9 islands:7
atoll | nature.land.coast | island:8 reef:8 lagoon:8 coral:6
isle | nature.land.coast | island:9
islet | nature.land.coast | island:8 isle:7
sandbar | nature.land.coast | sand:7 beach:5 shore:5
shoreline | nature.land.coast | shore:9 coast:8 beach:7
seaside | nature.land.coast | beach:8 coast:7 seagull:4
headland | nature.land.coast | cliff:7 cape:8 coast:6
lagoon | nature.water.sea | atoll:6
ocean | nature.water.sea | atlantic:6 pacific:6
atlantic | nature.water.sea | ocean:8 pacific:6
pacific | nature.water.sea | ocean:8 atlantic:6
reservoir | nature.water.fresh | lake:8 dam:7 water:6
dam | nature.water.fresh | beaver:7 reservoir:7 river:6
well | nature.water.fresh | bucket:6 water:7 wish:4
spring | nature.water.fresh | well:4
brook | nature.water.fresh | stream:9 creek:9 river:7
rapids | nature.water.fresh | river:7 rafting:8 waterfall:6
current | nature.water.sea | flow:8 tide:6 river:5 electricity:5
whirlpool | nature.water.sea | spin:6 vortex:8 water:5
vortex | nature.water.sea | whirlpool:8 tornado:6 spin:6
ripple | nature.water.fresh | wave:7 pond:6 water:5
splashdown | action.move | splash:7 rocket:4
bay | nature.water.sea | cove:7
ravine | nature.land.relief | gorge:9 canyon:8 valley:6
gorge | nature.land.relief | ravine:9 canyon:8
crevasse | nature.land.relief | glacier:7 crack:7 ice:5
ridge | nature.land.relief | mountain:7 peak:6 hill:6
slope | nature.land.relief | hill:7 ski:7 mountain:5
foothill | nature.land.relief | hill:8 mountain:7
dune | nature.land.relief | sahara:5
sahara | nature.land.habitat | desert:9 sand:7 camel:6 egypt:4
volcano | nature.land.relief | vent:4
geyser | nature.water.fresh | yellowstone:4
hotspring | nature.water.fresh | spring:7 geyser:7 hot:6 sauna:4
cavern | nature.land.relief | cave:9 grotto:8 underground:6
grotto | nature.land.relief | cave:8 cavern:8
stalactite | nature.land.relief | cave:8 stalagmite:9 drip:5
stalagmite | nature.land.relief | stalactite:9 cave:8
pit | nature.land.ground | hole:8 dig:6
crack | quality.other | break:7 split:7 gap:6 crevasse:6
hole | nature.land.ground | pit:8 dig:7 tunnel:6 gap:6
cliffside | nature.land.relief | cliff:9
boulder | nature.land.ground | avalanche:3
cobblestone | material.other | stone:8 street:6 old:4
meteorite | sky.body | iron:4
asteroidbelt | sky.space | asteroid:9 space:6
nebula | sky.space | stardust:6
stardust | sky.space | star:7 dust:6 magic:4
supernova | sky.space | star:8 explode:7 explosion:7
blackhole | sky.space | gravity:8 space:7 galaxy:6 star:5
wormhole | sky.space | space:7 blackhole:7 time:5
milkyway | sky.space | galaxy:9 star:6
venus | sky.body | planet:8 mars:6 love:3
mercury | sky.body material.metal | planet:8 thermometer:5 metal:5
neptune | sky.body | planet:8 uranus:7 blue:4
uranus | sky.body | planet:8 neptune:7
pluto | sky.body | planet:7 dwarf:6 cold:4
sunspot | sky.body | sun:7 solar:6
starlight | sky.body | star:8 light:6 night:5
moonlight | sky.body | moon:9 night:7 light:6
moonbeam | sky.body | moon:8 moonlight:8
fullmoon | sky.body | moon:9 werewolf:7 night:5
newmoon | sky.body | moon:9 dark:5
halfmoon | sky.body | moon:9 crescent:7
aurora | sky.space weather.air | northernlights:9 polar:7 sky:6 light:5 green:4
northernlights | sky.space | aurora:9 arctic:6
shootingstar | sky.body | meteor:9 star:7 wish:7
lunarbase | sky.space | moon:7 astronaut:6
spacesuit | object.clothing.wear | astronaut:9 helmet:7 space:7
spacestation | vehicle.space | satellite:7 astronaut:7 orbit:7 space:7
shuttle | vehicle.space | rocket:8 spaceship:7 nasa:7
launchpad | place.transport | rocket:8 launch:8
launch | action.move | rocket:8 countdown:7 blast:6
countdown | time.unit | launch:7 timer:6 newyear:5
telescope | object.nav | stargazing:7
stargazing | activity.leisure | star:8 telescope:7 night:6 constellation:6
weatherman | person.job | forecast:8 weather:8
meteorologist | person.job | weather:8 forecast:8 weatherman:9
barometer | object.tech | weather:7 pressure:7
thermometer | object.tech | mercury:4
breezy | weather.air | breeze:9 wind:7 windy:8
windy | weather.air | wind:9 breezy:8 kite:5
stormy | weather.storm | storm:9 thunder:6 rain:6
rainy | weather.precip | rain:9 wet:7 umbrella:6
snowy | weather.precip | snow:9 winter:7 white:5
icy | quality.temp | ice:9 slippery:7 frozen:7 cold:7
foggy | weather.air | fog:9 mist:8 misty:8
misty | weather.air | mist:9 fog:8 foggy:8
cloudy | weather.air | cloud:9 grey:6 overcast:9
overcast | weather.air | cloudy:9 grey:6
drizzly | weather.precip | drizzle:9 rainy:7
humidity | weather.air | humid:9 damp:6 tropical:5
downpour | weather.precip | rain:9 storm:6 deluge:8 shower:7
deluge | weather.precip | flood:8 downpour:8
cloudburst | weather.precip | downpour:9 rain:8
hailstone | weather.precip | hail:9 ice:7
icicle | nature.water.ice | ice:9 frozen:7 winter:6 drip:4
snowdrift | weather.precip | snow:9 drift:6
snowstorm | weather.storm | blizzard:9 snow:8 storm:7
whiteout | weather.storm | blizzard:8 snow:7 fog:5
thunderstorm | weather.storm | storm:9 thunder:9 lightning:8 rain:7
squall | weather.storm | gust:8 storm:7
gale | weather.storm | wind:8 storm:7 gust:7
waterspout | weather.storm | tornado:8 sea:5
sandstorm | weather.storm | desert:8 sand:8 storm:7 wind:6
duststorm | weather.storm | sandstorm:9 dust:7
drought | weather.temp | heatwave:5
heat | weather.temp | sizzle:5
scorching | quality.temp | hot:9 burning:7 heat:7 sun:5
sweltering | quality.temp | hot:8 humid:7 heatwave:7
balmy | quality.temp | warm:8 mild:7 pleasant:6
mild | quality.temp | warm:6 gentle:6 balmy:7 cool:4
frosty | quality.temp | frost:9 cold:8 icy:7
wintry | quality.temp | winter:8 snowy:7 cold:7
bitter | quality.taste quality.temp | sour:6 cold:4 coffee:4
crisp | quality.other | fresh:6 crunchy:7 autumn:4 apple:4
dawnlight | time.day | dawn:9 sunrise:7
sundown | time.day | sunset:9 dusk:8
nightfall | time.day | dusk:9 night:7 sunset:7
afternoon | time.day | noon:7 lunch:5 day:6 tea:4
lunchtime | time.day | lunch:9 noon:7
bedtime | time.day | night:7 sleep:7 bed:7 story:5
teatime | time.day | tea:8 afternoon:6
weekday | time.unit | week:8 monday:6
monday | time.unit | week:6 tuesday:7 weekday:6
tuesday | time.unit | monday:7 wednesday:7 week:6
wednesday | time.unit | tuesday:7 thursday:7 week:6
thursday | time.unit | wednesday:7 friday:7 week:6
friday | time.unit | thursday:7 weekend:7 week:6
saturday | time.unit | sunday:8 weekend:9
sunday | time.unit | saturday:8 weekend:9 rest:4
february | time.unit | winter:6 month:5 valentine:6
march | time.unit action.move | spring:6 month:5 walk:5 parade:6 soldier:4
may | time.unit | spring:6 month:5
june | time.unit | summer:7 month:5
decade | time.unit | year:8 century:7
millennium | time.unit | century:8 year:6
moment | time.unit | second:7 instant:8 minute:6
instant | time.unit | moment:8 quick:6
forever | time.unit | eternity:9 always:7 never:5
eternity | time.unit | forever:9 infinity:7
infinity | quality.other | eternity:7 forever:6 endless:7
timezone | time.unit | clock:6 hour:5
newyear | activity.leisure | firework:7 january:7 midnight:7 party:6 celebration:6
anniversary | activity.leisure | wedding:7 birthday:6 celebration:6
holidayseason | activity.leisure | christmas:8 holiday:7
hanukkah | activity.leisure | candle:6 holiday:6
diwali | activity.leisure | light:6 festival:7 lantern:6 india:5
carnival | activity.leisure | mask:5
oak | nature.plant.tree | oaktree:9
birch | nature.plant.tree | tree:7 bark:5 white:3
elm | nature.plant.tree | tree:7 oak:5
cedar | nature.plant.tree | tree:7 pine:6 wood:5
redwood | nature.plant.tree | tree:7 sequoia:9 giant:5 tall:5
sequoia | nature.plant.tree | redwood:9 giant:5
spruce | nature.plant.tree | pine:8 fir:8 christmas:5
fir | nature.plant.tree | pine:8 spruce:8 christmas:6
cypress | nature.plant.tree | tree:7 pine:5
poplar | nature.plant.tree | tree:7
chestnut | nature.plant.tree food.snack | conker:8 nut:7 roast:5 tree:6 brown:4
conker | nature.plant.part | chestnut:8 seed:5
hazel | nature.plant.tree | hazelnut:8 tree:6 brown:4
hazelnut | food.snack | nut:8 hazel:8 chocolate:5
pecan | food.snack | nut:8 walnut:7 pie:5
cashew | food.snack | nut:9 peanut:6
pistachio | food.snack | nut:9 green:4
macadamia | food.snack | nut:9
baobab | nature.plant.tree | tree:7 africa:6 savanna:5
eucalyptus | nature.plant.tree | koala:8 tree:6 australia:6
mahogany | nature.plant.tree | wood:8 tree:6 brown:5
evergreen | nature.plant.tree | pine:8 fir:7 christmas:5
sapling | nature.plant.tree | tree:8 sprout:7 young:5
stump | nature.plant.part | tree:7 log:7 trunk:6
pinecone | nature.plant.part | pine:9 cone:8 tree:5 squirrel:4
needle | nature.plant.part | pine:5
blossom | nature.plant.flower | sakura:7
sakura | nature.plant.flower | cherry:8 blossom:8 japan:7
bud | nature.plant.part | flower:7 bloom:7 blossom:7 spring:5
lavender | nature.plant.flower color.purple | purple:7 flower:7 smell:5 lilac:6
lilac | nature.plant.flower | flower:7 lavender:7
dandelion | nature.plant.flower | flower:7 wish:5 weed:6 yellow:5 seed:5
buttercup | nature.plant.flower | flower:7 yellow:6 daisy:6
poppy | nature.plant.flower | flower:7 red:6 field:4
violet | nature.plant.flower | flower:6
iris | nature.plant.flower body.part | flower:7 eye:6 purple:5
marigold | nature.plant.flower | flower:7 orange:6
daffodil | nature.plant.flower | flower:7 yellow:7 spring:7 tulip:6
hyacinth | nature.plant.flower | flower:7 spring:5 purple:4
crocus | nature.plant.flower | flower:7 spring:6
carnation | nature.plant.flower | flower:7 pink:5
chrysanthemum | nature.plant.flower | flower:7 autumn:4
peony | nature.plant.flower | flower:7 pink:5 rose:5
magnolia | nature.plant.flower | flower:7 tree:5
jasmine | nature.plant.flower | flower:7 tea:5 smell:5
honeysuckle | nature.plant.flower | flower:6 vine:6 bee:4
hibiscus | nature.plant.flower | flower:7 tropical:7 hawaii:5
lotus | nature.plant.flower | flower:7 pond:7 lily:7
waterlily | nature.plant.flower | lily:9 pond:8 frog:5 lotus:7
gardenia | nature.plant.flower | flower:7
geranium | nature.plant.flower | flower:7 pot:4
begonia | nature.plant.flower | flower:7
petunia | nature.plant.flower | flower:7
cornflower | nature.plant.flower | flower:7 blue:6
bluebell | nature.plant.flower | flower:7 blue:6 forest:4 bell:4
snowdrop | nature.plant.flower | flower:7 winter:6 white:5
foxglove | nature.plant.flower | flower:7 poison:4
thistle | nature.plant.other | prickly:7 scotland:6 weed:6 flower:5
nettle | nature.plant.other | sting:8 weed:7 itch:5
clover | nature.plant.other | fourleaf:8
shamrock | nature.plant.other | clover:9 ireland:7 luck:6 green:5
aloe | nature.plant.other | cactus:7 succulent:8 sunburn:6
succulent | nature.plant.other | cactus:8 aloe:8
reed | nature.plant.other | marsh:6 river:5 grass:6 flute:4
rush | nature.plant.other action.move | reed:7 hurry:8 fast:6
cattail | nature.plant.other | reed:8 marsh:6 pond:5
seagrass | nature.plant.other | seaweed:8 ocean:5
lichen | nature.plant.other | moss:8 rock:6 fungus:6
mold | nature.plant.other | fungus:7 bread:5 damp:6
spore | nature.plant.other | fungus:7 mushroom:6 seed:5
ivy | nature.plant.other | poison:4
mistletoe | nature.plant.other | christmas:8 kiss:7 holly:7
holly | nature.plant.other | christmas:8 mistletoe:7 berry:5 red:4
wreath | object.decoration | christmas:7 holly:7 door:5 flower:5
garland | object.decoration | wreath:7 flower:6 christmas:5 decoration:6
decoration | object.decoration | ornament:8 garland:6 christmas:5 party:5
ornament | object.decoration | decoration:8 bauble:8 christmas:6
bauble | object.decoration | ornament:8 christmas:7 tree:4 shiny:5
tinsel | object.decoration | christmas:7 glitter:7 shiny:6
herbgarden | place.outdoor | herb:8 garden:8
greenhouse | place.outdoor | plant:7 glass:6 garden:7 warm:4
allotment | place.outdoor | garden:8 vegetable:7
vegetablepatch | place.outdoor | vegetable:8 garden:8
flowerbed | place.outdoor | flower:8 garden:8 soil:5
compost | nature.land.ground | soil:8 garden:7 worm:6 rot:6
fertilizer | nature.land.ground | soil:7 compost:7 grow:6 farm:5
manure | nature.land.ground | fertilizer:8 farm:6 cow:5 smell:5
pollinate | action.make | bee:8 pollen:9 flower:7
harvestmoon | sky.body | moon:8 harvest:8 autumn:5

# ───────────── BIG EXPANSION · PEOPLE, JOBS, BODY, HEALTH ─────────────
grandmother | person.family | grandma:9 granny:9 grandfather:8 family:6 old:4
grandma | person.family | grandmother:9 granny:9 grandpa:8
granny | person.family | grandma:9 grandmother:9
grandfather | person.family | grandpa:9 grandmother:8 family:6
grandpa | person.family | grandfather:9 grandma:8
grandparent | person.family | grandmother:8 grandfather:8
grandchild | person.family | grandson:8 granddaughter:8 grandparent:7
grandson | person.family | grandchild:8 son:6
granddaughter | person.family | grandchild:8 daughter:6
son | person.family | daughter:8 boy:7 father:6 child:7
daughter | person.family | son:8 girl:7 mother:6 child:7
aunt | person.family | uncle:8 niece:6 family:6
uncle | person.family | aunt:8 nephew:6 family:6
niece | person.family | nephew:8 aunt:6
nephew | person.family | niece:8 uncle:6
cousin | person.family | family:6 aunt:5 uncle:5
twin | person.family | sibling:8 brother:6 sister:6 double:6
sibling | person.family | brother:9 sister:9 twin:7
husband | person.family | wife:9 marriage:7 groom:6
wife | person.family | husband:9 marriage:7 bride:6
spouse | person.family | husband:8 wife:8 marriage:7
marriage | activity.leisure | wedding:9 husband:7 wife:7 ring:5
fiance | person.family | engagement:8 bride:6 groom:6
couple | person.family | pair:7 love:5 marriage:6
partner | person.family | spouse:7 friend:6 couple:6
neighbor | person.family | neighbour:9 friend:5 house:4 street:4
neighbour | person.family | neighbor:9
stranger | person.family | unknown:6 friend:4
guest | person.family | visitor:9 host:7 party:5 hotel:4
visitor | person.family | guest:9 tourist:6
host | person.family | guest:7 party:5 show:4
teenager | person.age | teen:9 adolescent:9 child:5 school:4
teen | person.age | teenager:9
adult | person.age | grownup:9 man:5 woman:5
grownup | person.age | adult:9
elderly | person.age | old:8 senior:9 grandparent:6
senior | person.age | elderly:9 old:7
toddler | person.age | baby:8 child:7
infant | person.age | baby:9 newborn:8
newborn | person.age | baby:9 infant:8
gentleman | person.family | man:8 lady:7 polite:5
lady | person.family | woman:8 gentleman:7
sir | person.royal | knight:6 gentleman:6
madam | person.family | lady:8
duke | person.royal | duchess:9 prince:6 royal:7 noble:6
duchess | person.royal | duke:9 princess:6
baron | person.royal | noble:7 lord:7
lord | person.royal | king:6 noble:7 castle:4
noble | person.royal | lord:7 royal:6 knight:5
monarch | person.royal | king:9 queen:8
empress | person.royal | emperor:9 queen:8
czar | person.royal | emperor:8 king:7 russia:5
sultan | person.royal | king:8 palace:6
squire | person.royal | knight:8
jester | person.royal | juggle:5
peasant | person.royal | farmer:6 village:5 poor:5
villager | person.family | village:9 peasant:6
citizen | person.family | city:7 country:5 people:6
hero | person.fantasy | heroine:9
heroine | person.fantasy | hero:9
champion | person.job | gold:5
leader | person.job | captain:6
chief | person.job | leader:8 boss:7 head:5
boss | person.job | manager:8
manager | person.job | boss:8 office:6 team:5
employee | person.job | worker:8 job:7 office:6 boss:5
intern | person.job | employee:6 student:5 job:5
secretary | person.job | office:7 desk:6 assistant:7
assistant | person.job | helper:8 secretary:7
helper | person.job | assistant:8 help:8
receptionist | person.job | hotel:6 office:6 desk:6 reception:8
reception | place.room | hotel:7 lobby:7 desk:5 wedding:4
accountant | person.job | money:7 number:6 tax:7 bank:5
banker | person.job | bank:9 money:7
cashier | person.job | shop:7 money:6 till:7 checkout:7
shopkeeper | person.job | shop:9 store:7
salesman | person.job | sell:8 shop:6
businessman | person.job | business:9 office:6 suit:6 briefcase:6
business | activity.study | company:8 money:6 office:6
company | activity.study | business:8 boss:5
politician | person.job | president:7 election:8 government:8 vote:6
president | person.job | government:6
prime | quality.other | first:6 best:6 number:4
mayor | person.job | council:6
senator | person.job | politician:8 government:7
ambassador | person.job | embassy:9 country:6
diplomat | person.job | ambassador:8 embassy:7
officer | person.job | police:8 army:6 captain:5
detective | person.job | magnifier:6
inspector | person.job | detective:8 police:7
guard | person.job | security:8 prison:6 bodyguard:8 castle:4 protect:6
bodyguard | person.job | guard:8 protect:7
security | person.job | guard:8 lock:6 safe:6
spy | person.job | binoculars:4
pilot | person.job | copilot:8
copilot | person.job | pilot:8 plane:6
stewardess | person.job | flight:7 plane:7 airport:5
steward | person.job | stewardess:8 flight:6
astronaut | person.job | spacesuit:8
cosmonaut | person.job | astronaut:9 russia:5 space:7
sailor | person.job | sailboat:5
deckhand | person.job | sailor:8 ship:6
fisherman | person.job | trawler:6
lifeguard | person.job | beach:8 pool:8 swim:7 rescue:8 whistle:5
paramedic | person.job | ambulance:9 doctor:6 emergency:8 nurse:6
surgeon | person.job | doctor:8 surgery:9 hospital:7 scalpel:7
surgery | activity.study | surgeon:9 hospital:7 operation:8
operation | activity.study | surgery:8 hospital:6
scalpel | object.tool | surgeon:7 knife:7 sharp:5
vet | person.job | veterinarian:9 animal:7 pet:7 dog:5 cat:5
veterinarian | person.job | vet:9 animal:7
pharmacist | person.job | pharmacy:9 medicine:8 pill:6
pharmacy | place.building.public | chemist:9 medicine:8 pharmacist:9 pill:6
chemist | place.building.public person.job | pharmacy:9 chemistry:6
optician | person.job | glasses:8 eye:7 lens:5
psychologist | person.job | mind:7 brain:5 therapy:8
therapist | person.job | psychologist:8 therapy:9
therapy | activity.study | therapist:9 health:5
midwife | person.job | baby:8 nurse:7 birth:7
dentist | person.job | braces:5
hairdresser | person.job | barber:8 hair:8 haircut:8 scissors:6
stylist | person.job | hairdresser:8 fashion:6
tailor | person.job | sew:8 suit:7 needle:6 thread:6
seamstress | person.job | tailor:8 sew:8 dress:5
dressmaker | person.job | seamstress:8 dress:7
designer | person.job | design:8 fashion:7 artist:5
model | person.job | fashion:7 photo:5 catwalk:7
photographer | person.job | camera:9 photo:9 picture:6
painter | person.job | artist:9 paint:8 painting:8 brush:6
sculptor | person.job | sculpture:9 statue:7 marble:5 chisel:6
potter | person.job | pottery:9 clay:8 vase:5
poet | person.job | poem:9 writer:6 verse:7
writer | person.job | author:9 book:7 write:8 poet:6
journalist | person.job | reporter:9 newspaper:8 news:8
reporter | person.job | journalist:9 news:8 interview:6
editor | person.job | newspaper:6 writer:6 book:5
publisher | person.job | book:7 editor:6
cartoonist | person.job | cartoon:9 comic:7 drawing:7
illustrator | person.job | drawing:8 artist:7 book:5
animator | person.job | cartoon:8 animation:9
comedian | person.job | joke:8 funny:8 laugh:7 clown:5
magician | person.job | magic:9 trick:8 rabbit:5 hat:5 wand:6
juggler | person.job | juggle:9 circus:7 clown:5
ringmaster | person.job | circus:8
puppeteer | person.job | puppet:9 show:5
ventriloquist | person.job | puppet:7 voice:6
acrobat | person.job | gymnast:6
musician | person.job | pianist:7
pianist | person.job | piano:9 musician:7
guitarist | person.job | guitar:9 musician:7 band:6
drummer | person.job | drum:9 band:7 musician:6
violinist | person.job | violin:9 orchestra:7
conductor | person.job | orchestra:8 baton:8 train:5 symphony:6
composer | person.job | music:8 symphony:7 piano:5
dj | person.job | music:7 party:6 disco:7 record:5
rapper | person.job | rap:9 music:6 song:5
rap | activity.music | rapper:9 rhyme:7 music:6
popstar | person.job | singer:8 celebrity:7 famous:6
cheerleader | person.job | cheer:8 pompom:8 football:5
coach | person.job | team:7 sport:6 trainer:7
umpire | person.job | referee:9 baseball:5 tennis:5
jockey | person.job | horse:8 race:7 saddle:5
goalkeeper | person.job | goal:8 football:7 soccer:7 save:5
striker | person.job | football:7 goal:7
quarterback | person.job | football:8 throw:5
pitcher | person.job | baseball:7
skater | person.job | skate:9 ice:5 skateboard:6
surfer | person.job | surf:9 surfboard:8 wave:7 beach:6
diver | person.job | dive:9 scuba:8 underwater:6
climber | person.job | climb:9 mountain:7 rope:5
hiker | person.job | hike:9 trail:7 backpack:6
explorer | person.adventure | jungle:4
cowgirl | person.job | cowboy:9 horse:6 ranch:6
rancher | person.job | ranch:9 cowboy:7 cattle:6
farmhand | person.job | farmer:8 farm:7
beekeeper | person.job | bee:8 honey:8 hive:7
gamekeeper | person.job | forest:5 hunt:5
ranger | person.job | park:6 forest:7 wildlife:6
hunter | person.job | hunt:9 bow:5 deer:5 forest:5
trapper | person.job | hunter:7 fur:6 trap:7
fisherwoman | person.job | fisherman:9
miner | person.job | helmet:4
builder | person.job | build:8 construction:8 brick:7 hardhat:7
construction | activity.study | builder:8 crane:6 hardhat:7 building:6
bricklayer | person.job | brick:9 builder:8 wall:6
electrician | person.job | electricity:9 wire:8 plug:6
mechanic | person.job | spanner:6
welder | person.job | metal:7 spark:6 mask:5
engineer | person.job | engine:5
technician | person.job | engineer:7 repair:6 computer:5
programmer | person.job | code:9 computer:8 software:7 developer:8
developer | person.job | programmer:8 code:7 app:6
coder | person.job | programmer:9 code:9
hacker | person.job | computer:7 code:7 password:6
scientist | person.job | lab:7
inventor | person.job | gadget:6
professor | person.job | lecture:7
lecturer | person.job | professor:8 university:7 lecture:8
lecture | activity.study | lecturer:8 university:7 class:6
principal | person.job | headteacher:9 school:8 teacher:6
headteacher | person.job | principal:9 school:8
janitor | person.job | caretaker:9 mop:7 clean:6 school:5
caretaker | person.job | janitor:9
classmate | person.family | school:7 friend:6 student:6
pupil | person.job | classmate:5
babysitter | person.job | baby:7 nanny:8 child:6
nanny | person.job | babysitter:8 child:6
maid | person.job | clean:7 housekeeper:8 hotel:5
housekeeper | person.job | maid:8 clean:6 house:5
butler | person.job | mansion:7 servant:8 maid:6
servant | person.job | butler:8 maid:7
chef | person.job | sous:5
cook | person.job | chef:8
baker | person.job | oven:5
butcher | person.job | cleaver:6
grocer | person.job | grocery:9 shop:6 vegetable:5
greengrocer | person.job | vegetable:7 fruit:7 grocer:8
florist | person.job | flower:9 bouquet:8 rose:6
gardener | person.job | lawnmower:5
landscaper | person.job | gardener:8
plumber | person.job | pipe:8
postwoman | person.job | postman:9
courier | person.job | delivery:8 parcel:7 package:7
deliveryman | person.job | delivery:9 courier:8 pizza:4
driver | person.job | car:8 drive:9 taxi:6 bus:6
chauffeur | person.job | driver:9 limousine:7
trucker | person.job | truck:9 driver:7 road:5
mailman | person.job | postman:9 mail:8
soldier | person.job | sergeant:7
sergeant | person.job | soldier:7 army:7
general | person.job | army:7 soldier:6 war:5
admiral | person.job | navy:8 ship:6 captain:6
marine | person.job | navy:7 soldier:7 sea:5
knight | person.royal | sir:6
samurai | person.adventure | katana:8
katana | object.weapon | samurai:8 sword:8 ninja:6
priest | person.job | church:8 pray:7
nun | person.job | church:7 priest:6
monk | person.job | temple:7 priest:6 monastery:8
monastery | place.building.public | monk:8 church:5
judge | person.job | gavel:8
gavel | object.tool | judge:8 court:7 hammer:5
jury | person.job | judge:8 court:7
witness | person.family | court:6 crime:5 see:5
prisoner | person.adventure | prison:9 jail:8 cell:6
criminal | person.adventure | crime:9 thief:7 prison:7 police:6
burglar | person.adventure | thief:9 robber:8 steal:7 house:4
pickpocket | person.adventure | thief:8 wallet:6
smuggler | person.adventure | pirate:6 crime:6
outlaw | person.adventure | bandit:8 cowboy:6 sheriff:6
bandit | person.adventure | outlaw:8 robber:7 thief:7
gangster | person.adventure | criminal:8 crime:7
villain | person.fantasy | outlaw:4
victim | person.family | crime:6 help:4
rescuer | person.job | rescue:9 hero:6
rescue | action.move | save:8 lifeguard:7 hero:6 firefighter:6 help:6
volunteer | person.job | help:7 charity:7
crowd | person.family | fans:5
fanclub | person.family | fan:9 celebrity:5
fan | person.family | supporter:8 celebrity:5
supporter | person.family | fan:8 team:5
tourist | person.family | travel:7 camera:5 holiday:6 map:5 sightseeing:7
sightseeing | activity.leisure | tourist:7 travel:6
traveler | person.family | traveller:9 travel:9 tourist:7 journey:6
traveller | person.family | traveler:9
pilgrim | person.adventure | journey:6 pray:5
nomad | person.adventure | wander:7 desert:5 travel:6
wanderer | person.adventure | wander:9 nomad:7 travel:6
wander | action.move | roam:9 walk:6 explore:6
roam | action.move | wander:9
castaway | person.adventure | island:8 shipwreck:8 stranded:8
stranded | quality.other | castaway:8 alone:6 island:6
hermit | person.adventure | alone:7 cave:5
genius | person.family | smart:8 clever:8 brain:6 einstein:7
expert | person.family | master:7 professional:7 genius:5
beginner | person.family | novice:9 learner:8 new:5
novice | person.family | beginner:9
master | person.family | expert:7 teacher:5
apprentice | person.job | master:7 learner:7 student:5
learner | person.family | student:7 beginner:8
rival | person.family | enemy:7 opponent:8 competition:6
enemy | person.family | foe:9 rival:7 villain:5 friend:5
foe | person.family | enemy:9
opponent | person.family | rival:8 enemy:6 player:5
ally | person.family | friend:7 partner:6
companion | person.family | friend:8 partner:6
buddy | person.family | friend:9 pal:9
pal | person.family | buddy:9 friend:9
bestfriend | person.family | friend:9 buddy:7
crush | feeling.positive | love:7 romance:6 like:5
date | activity.leisure | romance:5 dinner:5
hug | action.daily | cuddle:8
cuddle | action.daily | hug:8 snuggle:8 teddy:5
snuggle | action.daily | cuddle:8 blanket:5 cozy:6
eyebrow | body.part | eye:8 face:6 hair:5
eyelash | body.part | eye:8 mascara:6 blink:5
eyelid | body.part | eye:8 blink:7 sleep:4
pupil | body.part | eye:7 iris:6
blink | action.daily | eye:8 wink:7 eyelid:7
wink | action.daily | blink:7 eye:6 joke:4
forehead | body.part | head:7 face:6 brow:7
brow | body.part | forehead:7 eyebrow:8
cheek | body.part | face:8 blush:6 kiss:4
chin | body.part | face:7 jaw:7 beard:6
jaw | body.part | chin:7 mouth:7 tooth:6 bite:5
lip | body.part | mouth:8 kiss:6 lipstick:6
tongue | body.part | mouth:8 taste:7 lick:7
gum | body.part | tooth:6 mouth:5
throat | body.part | neck:8 voice:6 swallow:5 cough:5
shoulder | body.part | arm:7 neck:5 back:5
elbow | body.part | arm:8 joint:6 knee:5
knee | body.part | leg:8 elbow:5 kneel:7 joint:6
ankle | body.part | foot:8 leg:6 sock:4
heel | body.part | foot:7 shoe:6
thigh | body.part | leg:8 knee:5
hip | body.part | waist:7 leg:5 bone:4
waist | body.part | hip:7 belt:6 belly:5
belly | body.part | stomach:9 tummy:9 button:4
tummy | body.part | belly:9 stomach:9
navel | body.part | bellybutton:9 belly:6
bellybutton | body.part | navel:9 belly:7
back | body.part | spine:7 shoulder:5
spine | body.inner | backbone:9 back:7 bone:6
backbone | body.inner | spine:9 bone:6
chest | body.part | lung:5
palm | body.part | fingerprint:4
fist | body.part | punch:8 hand:7 boxing:5
fingernail | body.part | nail:9 finger:8
fingerprint | body.part | finger:8 detective:5 thumb:5
knuckle | body.part | finger:7 fist:6
toenail | body.part | toe:8 nail:8
beard | body.part | mustache:8 hair:7 chin:6 shave:7
mustache | body.part | moustache:9 beard:8
freckle | body.part | skin:7 spots:5 sun:3
dimple | body.part | cheek:7 smile:6
wrinkle | body.part | skin:6 old:6 iron:5
muscle | body.inner | strong:8 arm:5 gym:6
skeleton | body.inner | spine:5
rib | body.inner | bone:7 chest:6 skeleton:6
skull | body.inner | spine:4
kidney | body.inner | organ:7 liver:6
liver | body.inner | organ:7 kidney:6
organ | body.inner object.music | heart:6 kidney:7 liver:7 piano:5 church:4
vein | body.inner | blood:8 artery:8 heart:5
artery | body.inner | vein:8 blood:8 heart:6
nerve | body.inner | brain:6 feel:5
pulse | body.inner | heartbeat:9 heart:8 beat:6
heartbeat | body.inner | pulse:9 heart:8 beat:7
sneeze | action.daily | nose:7 cold:5 tissue:7 achoo:9 allergy:6
cough | action.daily | throat:6 cold:6 sick:6 sneeze:6
hiccup | action.daily | burp:6
burp | action.daily | hiccup:6 belch:9
yawn | action.daily | stretch:4
snore | action.daily | sleep:7 nose:4
sweat | body.inner | sweaty:7
blush | action.daily | cheek:6 red:6 shy:7
shiver | action.daily | goosebumps:7
goosebumps | body.part | shiver:7 cold:6 fear:5 skin:5
bruise | body.part | hurt:7 purple:4 injury:7
scar | body.part | wound:7 cut:6 skin:5
wound | body.inner | cut:8 injury:8 blood:6 bandage:7 scar:7
injury | body.inner | wound:8 hurt:8 bruise:7
cut | body.inner | wound:8
hurt | feeling.negative | pain:9 injury:8 ouch:8
pain | feeling.negative | hurt:9 ache:9 ouch:7
ache | feeling.negative | pain:9 headache:8
headache | body.inner | ache:8 head:7 pain:7
toothache | body.inner | tooth:8 ache:8 dentist:7
stomachache | body.inner | stomach:8 ache:8
ouch | feeling.negative | hurt:8 pain:7
flu | body.inner | influenza:9 cold:7 fever:7 sick:7
influenza | body.inner | flu:9
allergy | body.inner | sneeze:6 pollen:6 nut:4
rash | body.inner | itch:8 skin:6 red:4
itch | body.inner | scratch:8 mosquito:6 rash:7 flea:5
scratch | action.daily | itch:8 claw:6 cat:5
measles | body.inner | spots:7 sick:6 fever:5
chickenpox | body.inner | spots:7 itch:6 sick:6
fracture | body.inner | broken:8 bone:7 cast:6
broken | quality.other | fracture:8 crack:7 smash:6
cast | object.misc | broken:6 arm:5 fracture:6
health | body.inner | healthy:9 doctor:5
healthy | quality.other | health:9 fit:7 vegetable:5
fitness | activity.sport | fit:8 gym:8 exercise:8
fit | quality.other | healthy:7 fitness:8 strong:5
exercise | activity.sport | workout:9 gym:8 fitness:8 run:6
workout | activity.sport | exercise:9 gym:8
gym | place.building.public | exercise:8 workout:8 muscle:6 fitness:8
yoga | activity.sport | stretch:7 meditation:7 mat:6 relax:6
meditation | activity.leisure | calm:7 yoga:7 peace:6 relax:7
stretch | action.move | yoga:7 reach:6 muscle:5
diet | food.meal | healthy:6 food:6 vegetable:4
vitamin | food.meal | health:6 orange:4 pill:5
protein | food.meal | meat:6 egg:5 muscle:5
calorie | food.meal | food:6 diet:6
sleepwalk | action.daily | sleep:8 dream:5
nightmare | feeling.mind | wake:3

# ───────────── BIG EXPANSION · PLACES, BUILDINGS, CITY, TRANSPORT ─────────────
supermarket | place.building.public | grocery:8 shop:8 store:8 trolley:6 checkout:7
grocery | place.building.public | supermarket:8 food:6 shop:7
mall | place.building.public | shop:7 shopping:8 store:6
store | place.building.public | shop:9
shopping | activity.leisure | shop:9 mall:8 buy:7 bag:5
boutique | place.building.public | shop:8 fashion:7 dress:5
bookshop | place.building.public | bookstore:9 book:8 shop:7
bookstore | place.building.public | bookshop:9 book:8
toyshop | place.building.public | toy:9 shop:7
pharmacy | place.building.public | prescription:6
bakery | place.building.public | croissant:5
butchery | place.building.public | butcher:9 meat:7
deli | place.building.public | delicatessen:9 sandwich:7 cheese:5
delicatessen | place.building.public | deli:9
diner | place.building.public | restaurant:7 cafe:7 burger:5 pancake:5
bistro | place.building.public | restaurant:8 cafe:7 france:4
pizzeria | place.building.public | pizza:9 restaurant:6
canteen | place.building.public | cafeteria:9 lunch:6 school:5
cafeteria | place.building.public | canteen:9 lunch:7 tray:6
inn | place.building.public | hotel:8 pub:6 tavern:8
tavern | place.building.public | inn:8 pub:8 beer:6
motel | place.building.public | hotel:9 road:5
hostel | place.building.public | hotel:7 backpack:5
cinema | place.building.public | multiplex:5
opera | activity.music | singer:6 theater:6 soprano:7
amphitheater | place.building.public | theater:7 stage:6 arena:6
auditorium | place.building.public | hall:8 stage:6 audience:7
hall | place.building.public | auditorium:8 room:5 corridor:5
townhall | place.building.public | mayor:8 city:6 hall:7
cityhall | place.building.public | townhall:9 mayor:8
courthouse | place.building.public | court:9 judge:8
embassy | place.building.public | ambassador:9 country:6
policestation | place.building.public | police:9 jail:6
firestation | place.building.public | firefighter:9 fire:6 engine:5
postoffice | place.building.public | mail:8 stamp:7 letter:7 postman:7
bank | place.building.public | vault:5
school | place.building.public | playground:5
kindergarten | place.building.public | nursery:7 school:7 child:6 toy:4
college | place.building.public | university:9 student:7 school:6
university | place.building.public | college:9 professor:7 campus:8
campus | place.building.public | university:8 college:7
academy | place.building.public | school:8 college:7
dormitory | place.room | dorm:9 college:6 bed:5
dorm | place.room | dormitory:9
classroom | place.room | blackboard:7
gymnasium | place.building.public | gym:9 sport:6
stadium | place.building.public | grandstand:7
racetrack | place.outdoor | race:9 horse:5 car:5 track:7
track | place.outdoor | racetrack:7 train:6 run:5 path:5
court | place.building.public | basketball:6
pitch | place.outdoor | field:7 football:7 soccer:6 grass:5
skatepark | place.outdoor | skateboard:9 skate:7 ramp:7
ramp | place.outdoor | skateboard:6 slope:6 slide:5
playground | place.outdoor | seesaw:7
sandpit | place.outdoor | sandbox:9 sand:7 playground:6
sandbox | place.outdoor | sandpit:9 sand:7
waterpark | place.outdoor | pool:7 slide:7 splash:6
themepark | place.outdoor | rollercoaster:8 ride:7 carousel:6 fun:6
amusementpark | place.outdoor | themepark:9 rollercoaster:8 fair:7
funfair | place.outdoor | fair:9 carnival:7 ferriswheel:7
fair | place.outdoor activity.leisure | carnival:7 funfair:9 ride:5
rollercoaster | object.toy | themepark:8 ride:7 scream:6 loop:5
carousel | object.toy | merrygoround:9 horse:5 fair:6
merrygoround | object.toy | carousel:9 spin:6
ferriswheel | object.toy | wheel:7 fair:7 themepark:6 view:5
zoo | place.outdoor | zookeeper:7
zookeeper | person.job | zoo:9 animal:7
aquarium | place.building.public | shark:4
botanical | place.outdoor | garden:7 plant:7 flower:5
museum | place.building.public | curator:7
curator | person.job | museum:8 gallery:7
planetarium | place.building.public | star:7 planet:7 space:6 observatory:7
library | place.building.public | bookcase:5
laboratory | place.building.public | lab:9
lab | place.building.public | laboratory:9 science:7 scientist:7
hospital | place.building.public | wardroom:4
clinic | place.building.public | doctor:8 hospital:8 nurse:6
dentistry | place.building.public | dentist:9 tooth:6
church | place.building.public | steeple:7
cathedral | place.building.public | church:9 bishop:6 spire:7
chapel | place.building.public | church:9 wedding:5
mosque | place.building.public | pray:7 temple:6 minaret:8
synagogue | place.building.public | pray:6 temple:7
shrine | place.building.public | temple:8 pray:6
pagoda | place.building.grand | temple:7 tower:6 china:5 japan:5
steeple | place.building.tower | church:7 spire:9 bell:6
spire | place.building.tower | steeple:9 tower:7 church:6
minaret | place.building.tower | mosque:8 tower:7
belltower | place.building.tower | bell:9 tower:8 church:6
clocktower | place.building.tower | clock:9 tower:8 bigben:7
bigben | place.building.tower | clocktower:7 london:8 clock:6
watchtower | place.building.tower | tower:9 guard:6 castle:5
fort | place.building.grand | fortress:9 castle:7 soldier:5
citadel | place.building.grand | fortress:9 castle:7
stronghold | place.building.grand | fortress:9 castle:7
keep | place.building.grand | castle:7 tower:6
rampart | place.building.grand | wall:8 castle:7 fortress:6
battlement | place.building.grand | castle:8 wall:7 turret:7
throneroom | place.room | throne:9 king:7 castle:6
greathall | place.room | castle:7 feast:6 hall:7
colosseum | place.building.grand | rome:8 gladiator:8 arena:8 ancient:6
parthenon | place.building.grand | greece:7 temple:7 ancient:7
acropolis | place.building.grand | parthenon:8 greece:7 ancient:6
ziggurat | place.building.grand | pyramid:7 temple:6 ancient:6
skyscraper | place.building.tower | elevator:5
highrise | place.building.tower | skyscraper:9 tower:7 apartment:6
tower | place.building.tower | eiffel:5
eiffeltower | place.building.tower | paris:9 tower:8 france:7
lighthouse | place.building.tower | lamp:4
windmill | place.building.tower | mill:6
mill | place.building.farm | windmill:9 flour:7 wheat:6 waterwheel:7
watermill | place.building.farm | mill:9 waterwheel:8 river:5
waterwheel | object.tool | watermill:8 mill:7 river:5
silo | place.building.farm | farm:7 grain:7 barn:6 corn:5
henhouse | place.building.farm | coop:9 chicken:8 hen:8
pigsty | place.building.farm | pig:9 mud:6 farm:6
kennel | place.building.home | dog:8 doghouse:9
doghouse | place.building.home | kennel:9 dog:8
stable | place.building.farm | hay:5
farmhouse | place.building.home | farm:9 house:7 barn:6
bungalow | place.building.home | house:8 cottage:7
villa | place.building.home | mansion:8 holiday:6 italy:4 pool:4
chalet | place.building.home | cabin:8 ski:7 mountain:6 snow:5
lodge | place.building.home | cabin:8 chalet:7 hotel:5
cabin | place.building.home | lodge:6
treehouse | place.building.home | tree:8 house:6 ladder:6 child:4
houseboat | place.building.home vehicle.water | boat:8 house:7 canal:6
caravan | vehicle.land place.building.home | trailer:8 camping:7 holiday:5 van:6
trailer | vehicle.land | caravan:8 truck:6 movie:4
tepee | place.building.home | tipi:9 tent:8
tipi | place.building.home | tepee:9 tent:8
yurt | place.building.home | tent:8 mongolia:6
palace | place.building.grand | ballroom:6
ballroom | place.room | dance:8 palace:6 ball:6 waltz:6
apartment | place.building.home | landlord:5
flat | place.building.home | apartment:9
penthouse | place.building.home | apartment:8 rich:6 skyscraper:6
landlord | person.job | rent:8 apartment:6 house:5
rent | activity.study | landlord:8 apartment:6 money:5
neighborhood | place.urban | neighbourhood:9 street:7 neighbor:7 town:6
neighbourhood | place.urban | neighborhood:9
suburb | place.urban | town:7 city:6 house:5
downtown | place.urban | city:8 center:6 skyscraper:5
center | place.urban | middle:8 centre:9 downtown:6
centre | place.urban | center:9
square | place.urban | plaza:8 town:5
plaza | place.urban | square:8 fountain:6 market:5
fountain | object.decoration | water:7 plaza:6 coin:5 wish:5 park:5
statue | activity.art | plaza:4
monument | place.building.grand | landmark:7
landmark | place.urban | monument:7 famous:6 tower:5
alley | place.urban | lane:8 street:7 dark:4 cat:3
alleyway | place.urban | alley:9
lane | place.urban | road:8 street:8 alley:7
avenue | place.urban | street:9 road:8 boulevard:8
boulevard | place.urban | avenue:8 street:7
highway | place.urban | motorway:9 freeway:9 road:9 car:6 traffic:6
motorway | place.urban | highway:9 road:8
freeway | place.urban | highway:9
roundabout | place.urban | traffic:6 road:6 circle:5
crossroads | place.urban | junction:9 intersection:9 road:6
intersection | place.urban | crossroads:9 traffic:6
junction | place.urban | crossroads:9 road:6
sidewalk | place.urban | pavement:9 street:7 walk:6
pavement | place.urban | sidewalk:9
crosswalk | place.urban | zebracrossing:9 street:6 traffic:5
zebracrossing | place.urban | crosswalk:9 zebra:3
trafficlight | object.misc | traffic:9 red:5 green:5 stop:6 road:5
streetlight | object.light | lamppost:9 street:7 light:7 night:4
lamppost | object.light | streetlight:9 street:6
signpost | object.misc | sign:9 direction:7 road:5
sign | object.misc | signpost:9 arrow:5 warning:5 stop:5
billboard | object.misc | sign:7 advert:8 road:4
bench | object.furniture | parkbench:8
parkbench | object.furniture | bench:9 park:8
bin | object.container | trash:8 rubbish:8 garbage:8 recycle:6
trash | object.misc | garbage:9 rubbish:9 bin:8 litter:7
garbage | object.misc | trash:9 rubbish:9 bin:8
rubbish | object.misc | trash:9 garbage:9 bin:8
litter | object.misc | trash:7 rubbish:7
recycle | action.make | bin:6 plastic:6 paper:5 green:4
dumpster | object.container | trash:8 garbage:8 bin:7
sewer | place.urban | drain:7 rat:6 underground:6 pipe:6
manhole | place.urban | sewer:8 street:5
bridge | place.urban | overpass:6
overpass | place.urban | bridge:8 highway:6
viaduct | place.urban | bridge:8 train:5
tunnel | place.urban | subway:6
toll | place.urban | road:6 bridge:5 money:5
parking | place.urban | car:8 park:6 garage:7
carpark | place.urban | parking:9 car:7
garage | place.room | mechanic:6
petrolstation | place.transport | gasstation:9 fuel:8 car:7
gasstation | place.transport | petrolstation:9 fuel:8 gas:7
fuel | object.misc | petrol:9 gas:8 energy:6 car:5
petrol | object.misc | fuel:9 gasoline:9 car:6
gasoline | object.misc | petrol:9 fuel:9
gas | material.other | fuel:8 air:5 helium:6 balloon:3
railway | place.transport | railroad:9 train:9 track:7
railroad | place.transport | railway:9 train:9
platform | place.transport | station:8 train:7
terminal | place.transport | airport:7 station:6 bus:5
runway | place.transport | airport:9 plane:8 takeoff:7
hangar | place.transport | plane:8 airport:7 garage:5
heliport | place.transport | helicopter:9 airport:5
harbor | place.transport | quay:7
quay | place.transport | dock:9 wharf:8 harbor:7
marina | place.transport | harbor:9 yacht:8 boat:7
shipyard | place.transport | ship:8 dock:7 harbor:6
lighthouse | place.building.tower | keeper:4
busstop | place.transport | bus:9 stop:7 wait:5
taxi | vehicle.land | taxicab:9
taxicab | vehicle.land | taxi:9 cab:9
cab | vehicle.land | taxi:9
limousine | vehicle.land | limo:9 car:8 rich:5 celebrity:5
limo | vehicle.land | limousine:9
minivan | vehicle.land | van:9 family:5 car:7
jeep | vehicle.land | car:7 safari:6 offroad:7
sportscar | vehicle.land | car:9 fast:7 race:6
racecar | vehicle.land | car:9 race:9 fast:7 track:6
convertible | vehicle.land | car:8 roof:5 summer:4
pickup | vehicle.land | truck:9 farm:4
lorry | vehicle.land | truck:9
firetruck | vehicle.land | firefighter:9 truck:8 siren:7 fire:6 ladder:6
fireengine | vehicle.land | firetruck:9 firefighter:8
ambulance | vehicle.land | hospital:8 siren:8 paramedic:8 emergency:8
policecar | vehicle.land | police:9 siren:8 car:7
siren | object.tech | ambulance:8 police:7 alarm:7 loud:6
bulldozer | vehicle.land | digger:8 construction:7 tractor:6
digger | vehicle.land | excavator:9 bulldozer:8 dig:7
excavator | vehicle.land | digger:9
forklift | vehicle.land | warehouse:7 lift:6
steamroller | vehicle.land | road:6 flat:5
tank | vehicle.land | army:7 soldier:5 cannon:5
cart | vehicle.land | horse:5
chariot | vehicle.land | horse:7 rome:6 race:5 gladiator:5
stagecoach | vehicle.land | coach:8 horse:7 cowboy:5 carriage:8
sleigh | vehicle.land | snow:5
toboggan | vehicle.land | sled:9 snow:7 hill:5
snowmobile | vehicle.land | snow:8 sled:6
quadbike | vehicle.land | motorcycle:7
unicycle | vehicle.land | bicycle:8 circus:7 wheel:7
tricycle | vehicle.land | bicycle:8 child:5 wheel:6
tandem | vehicle.land | bicycle:8
moped | vehicle.land | scooter:9 motorcycle:7
segway | vehicle.land | scooter:7
skateboard | activity.sport | wheel:4
tram | vehicle.land | streetcar:9
streetcar | vehicle.land | tram:9 trolley:8
monorail | vehicle.land | train:8 rail:7 futuristic:5
locomotive | vehicle.land | train:9 engine:8 steam:6
carriage | vehicle.land | wagon:6
caboose | vehicle.land | train:7
bulletrain | vehicle.land | train:9 fast:8 japan:6
cablecar | vehicle.land | gondola:8 mountain:6 ski:5
gondola | vehicle.water | venice:8 canal:7 boat:7 cablecar:7
ferry | vehicle.water | passenger:5
cruise | activity.leisure | ship:8 holiday:7 ocean:5
cruiseship | vehicle.water | cruise:9 ship:8 holiday:6
liner | vehicle.water | ship:8 ocean:6 cruise:6
tugboat | vehicle.water | boat:8 harbor:6 tow:6
trawler | vehicle.water | fishing:8 boat:8 net:6
barge | vehicle.water | boat:7 canal:7 river:5
dinghy | vehicle.water | boat:9 raft:6
rowboat | vehicle.water | boat:9 oar:8 row:8
lifeboat | vehicle.water | boat:8 rescue:7 ship:6
jetski | vehicle.water | boat:6 water:6 fast:5
speedboat | vehicle.water | boat:9 fast:7
catamaran | vehicle.water | sailboat:8 boat:7
galleon | vehicle.water | ship:9 pirate:7 sail:7 treasure:5
schooner | vehicle.water | ship:8 sail:7
warship | vehicle.water | navy:8 ship:8 battleship:9 cannon:6
battleship | vehicle.water | warship:9 navy:7
aircraftcarrier | vehicle.water | navy:7 plane:6 ship:7
airliner | vehicle.air | plane:9 jet:8 airport:6
glider | vehicle.air | plane:7 glide:8 wing:5
seaplane | vehicle.air | plane:8 water:5
biplane | vehicle.air | plane:8 wing:6
fighterjet | vehicle.air | jet:9 plane:7 navy:4
airship | vehicle.air | zeppelin:9 blimp:8
hotairballoon | vehicle.air | balloon:9 basket:7 sky:6 float:5
hanglider | vehicle.air | glider:8 fly:6 cliff:4
kayak | vehicle.water | paddle:7
surfboard | object.toy | wax:4
paddleboard | object.toy | surfboard:8 paddle:7
passenger | person.family | ticket:6 train:5 plane:5 bus:5
commute | activity.leisure | train:6 bus:6 work:6 traffic:5
journey | activity.leisure | passenger:4
departure | place.transport | arrival:8 airport:6 leave:6
arrival | place.transport | departure:8 airport:5 arrive:7
luggage | object.container | suitcase:9 baggage:9 travel:6
baggage | object.container | luggage:9 suitcase:8
boardingpass | object.paper | ticket:8 plane:6 airport:6
visa | object.paper | passport:8 travel:5
map | object.nav | roadmap:5
souvenir | object.misc | holiday:7 gift:6 memory:6 tourist:6

# ───────────── BIG EXPANSION · SPORT, HOBBIES, MUSIC, ARTS, ENTERTAINMENT ─────────────
rugby | activity.sport | football:7 tackle:7 ball:5 scrum:7
cricket | activity.sport | wicket:8 batsman:7
wicket | activity.sport | cricket:8 bat:5
badminton | activity.sport | shuttlecock:9 racket:7 tennis:7 net:5
shuttlecock | object.toy | badminton:9 feather:5
racket | object.toy | tennis:8 badminton:7 ball:5 noise:4
pingpong | activity.sport | tabletennis:9 paddle:6 ball:5
tabletennis | activity.sport | pingpong:9 tennis:7
squash | activity.sport | racket:6 tennis:5
handball | activity.sport | ball:6 throw:5 goal:5
netball | activity.sport | basketball:7 hoop:6
softball | activity.sport | baseball:9 bat:6
lacrosse | activity.sport | stick:6 ball:5
polo | activity.sport | horse:7 mallet:6
golf | activity.sport | putt:7 caddie:7 hole:6 tee:7
putt | activity.sport | golf:7 hole:5
caddie | person.job | golf:7
tee | activity.sport | golf:7
hoop | object.toy | basketball:8 ring:5 hula:7
hula | activity.music | hoop:7 dance:6 hawaii:7
bowling | activity.sport | strike:6
darts | activity.sport | dartboard:9 target:8 pub:5 throw:5
dart | object.toy | darts:9 arrow:6 target:7
dartboard | object.toy | darts:9 target:8 bullseye:8
bullseye | object.misc | target:9 dart:7 centre:5
billiards | activity.sport | pool:7 snooker:9 cue:8
snooker | activity.sport | billiards:9 cue:7
cue | object.toy | billiards:8 snooker:7 pool:5
fencing | activity.sport | sword:7 mask:5 duel:6
duel | activity.conflict | sword:6 fencing:6 cowboy:4
judo | activity.sport | karate:8 belt:5
taekwondo | activity.sport | karate:8 kick:6
kungfu | activity.sport | karate:8 martial:8
martial | activity.sport | karate:8 kungfu:8
wrestling | activity.sport | wrestle:9 fight:6 boxing:6
wrestle | activity.sport | wrestling:9
sumo | activity.sport | wrestling:8 japan:6
boxer | person.job | boxing:9 punch:7 glove:6
punchbag | object.toy | boxing:8 punch:8
gymnastics | activity.sport | gymnast:9 olympics:6 flip:6
cartwheel | action.move | gymnastics:7 handstand:7 flip:6
handstand | action.move | cartwheel:7 gymnastics:6
somersault | action.move | flip:8 cartwheel:6
flip | action.move | somersault:8 pancake:4 coin:4
trampolining | activity.sport | trampoline:9 bounce:6
athletics | activity.sport | race:7 run:7 olympics:7 javelin:6
sprinting | activity.sport | sprint:9 race:8
hurdle | activity.sport | jump:7 race:6
javelin | activity.sport | throw:7 spear:7 athletics:6
discus | activity.sport | throw:7 athletics:6
shotput | activity.sport | throw:7 athletics:6
relay | activity.sport | race:8 baton:7 team:5
baton | object.misc | relay:7 conductor:7 police:4
pole | object.misc | stick:7 flag:5 fishing:4
polevault | activity.sport | jump:7 pole:7
highjump | activity.sport | jump:8 athletics:6
longjump | activity.sport | jump:8 sand:4
triathlon | activity.sport | swim:6 run:6 bicycle:6 race:6
cycling | activity.sport | bicycle:9 bike:8 race:5
mountainbike | vehicle.land | bicycle:9 mountain:6
bmx | activity.sport | bicycle:8 ramp:6
rowing | activity.sport | row:9 boat:7 oar:8
canoeing | activity.sport | canoe:9 paddle:7
kayaking | activity.sport | kayak:9 paddle:7
rafting | activity.sport | raft:9 rapids:8 river:6
sailing | activity.sport | sail:9 sailboat:8 boat:6 wind:5
windsurfing | activity.sport | surf:8 sail:7 wind:6
kitesurfing | activity.sport | surf:8 kite:7 wind:6
waterskiing | activity.sport | ski:7 boat:6 water:5
snorkeling | activity.sport | snorkel:9 reef:6 swim:6
skiing | activity.sport | ski:9 snow:7 slope:7
snowboarding | activity.sport | snowboard:9 snow:7
sledding | activity.sport | sled:9 snow:7 hill:5
iceskating | activity.sport | skate:9 ice:8 rink:8
curling | activity.sport | ice:7 stone:5 broom:5
skating | activity.sport | skate:9 rink:6
rollerblading | activity.sport | skate:8 rollerskate:8
climbing | activity.sport | climb:9 rope:6 mountain:6
mountaineering | activity.sport | climbing:9 mountain:8 summit:6
abseiling | activity.sport | rope:7 cliff:6 climbing:6
caving | activity.sport | cave:9 underground:6
camping | activity.leisure | sleepingbag:7
sleepingbag | object.misc | camping:8 tent:7 sleep:6
campsite | place.outdoor | camping:9 tent:8 campfire:6
backpacking | activity.leisure | backpack:9 hike:7 travel:6
orienteering | activity.sport | map:7 compass:7 run:5
birdwatching | activity.leisure | bird:8 binoculars:8
fishingrod | object.tool | rod:9 fishing:9 hook:7
rod | object.tool | fishing:8
hunting | activity.leisure | hunt:9 hunter:8
horseriding | activity.sport | horse:9 ride:8 saddle:6
equestrian | activity.sport | horse:8 horseriding:8
rodeo | activity.sport | cowboy:8 bull:7 horse:6 lasso:6
lasso | object.tool | rope:7 cowboy:7 rodeo:6
marathon | activity.sport | jogging:5
jogging | activity.sport | jog:9 run:8
jog | action.move | jogging:9
skipping | activity.leisure | skip:8 rope:6 jump:5
hopscotch | activity.leisure | game:6 chalk:6 hop:7 playground:6
hideandseek | activity.leisure | hide:8 seek:8 game:6
tag | activity.leisure | game:5 chase:6
leapfrog | activity.leisure | jump:6 frog:4 game:5
marbles | activity.leisure | marble:8 game:5 glass:4
yoyo | object.toy | toy:7 string:6 spin:5
kite | object.toy | kitesurfing:4
frisbee | object.toy | disc:7 throw:7 dog:4 beach:4
boomerang | object.toy | throw:7 australia:6 return:6
slingshot | object.toy | catapult:9 stone:5
catapult | object.weapon | slingshot:9 castle:5 throw:5
waterpistol | object.toy | watergun:9 splash:6 water:6
watergun | object.toy | waterpistol:9 splash:6
teddybear | object.toy | teddy:9 bear:6 toy:7
plush | object.toy | teddy:7 soft:6
rattle | object.toy | baby:7 snake:4
puppet | object.toy | puppeteer:8 string:5 doll:6 show:5
marionette | object.toy | puppet:9 string:7
actionfigure | object.toy | doll:7 toy:8 superhero:6
lego | object.toy | brick:7 build:7 toy:8
blocks | object.toy | lego:7 build:6 toy:6
dollhouse | object.toy | doll:8 house:6 toy:6
rockinghorse | object.toy | horse:7 toy:7 rock:4
spinningtop | object.toy | spin:8 toy:7
kaleidoscope | object.toy | colorful:7 pattern:7 mirror:5
jigsawpuzzle | object.toy | jigsaw:9 puzzle:9
crossword | object.paper | puzzle:9 word:7 clue:7 newspaper:6
sudoku | object.paper | puzzle:9 number:7 grid:6
wordsearch | object.paper | puzzle:8 word:8
rubik | object.toy | cube:8 puzzle:8
checkers | activity.leisure | draughts:9 chess:7 board:6
draughts | activity.leisure | checkers:9
backgammon | activity.leisure | dice:7 board:6 game:6
dominoes | activity.leisure | domino:9 game:6
domino | object.toy | dominoes:9 fall:5
bingo | activity.leisure | number:6 game:6 card:5 win:5
monopoly | activity.leisure | boardgame:8 money:6 dice:6
boardgame | activity.leisure | game:8 dice:7 chess:6 board:6
cardgame | activity.leisure | card:9 game:7 poker:7
poker | activity.leisure | card:8 casino:7 bluff:6
casino | place.building.public | gamble:8 poker:7 dice:6 money:6 luck:5
gamble | action.daily | casino:8 bet:9 luck:6 dice:6
bet | action.daily | gamble:9 money:5
jackpot | object.misc | lottery:9 win:7 prize:7 casino:7 money:6
ace | object.toy quality.other | card:8 best:6 expert:5
joker | object.toy person.fantasy | card:7 clown:7 joke:6
deck | object.boatpart | cards:5
hobby | activity.leisure | pastime:9 interest:7 fun:5
pastime | activity.leisure | hobby:9
knitting | activity.leisure | knit:9 wool:8 needle:6 yarn:7
sewing | activity.leisure | sew:9 needle:8 thread:8
crochet | activity.leisure | knit:8 yarn:8 hook:5
embroidery | activity.leisure | sew:8 thread:7 needle:6
quilting | activity.leisure | quilt:9 sew:7
weaving | activity.leisure | weave:9 loom:8 thread:6 basket:5
weave | action.make | weaving:9 loom:7 spider:4
loom | object.tool | weave:7 weaving:8
origami | activity.art | paper:8 fold:8 crane:6 japan:6
scrapbook | object.paper | photo:7 album:7 memory:6
collage | activity.art | photo:6 paper:6 glue:6
pottery | activity.art | wheel:4
woodwork | activity.art | carpenter:7 wood:8 carve:6
carving | activity.art | carve:9 wood:7 knife:5 pumpkin:5
carve | action.make | carving:9 knife:6
gardening | activity.leisure | garden:9 plant:7 flower:6 soil:6
baking | activity.leisure | bake:9 cake:7 oven:7 cookie:6
cooking | activity.leisure | cook:9 kitchen:7 recipe:7
reading | activity.leisure | read:9 book:8 library:5
writing | activity.art | write:9 pen:6 story:6
painting | activity.art | easel:7
easel | object.tool | painting:7 canvas:7 artist:7
palette | object.tool | paint:8 artist:7 color:6 brush:5
watercolor | activity.art | paint:8 painting:7 brush:5
oilpainting | activity.art | painting:9 canvas:7
sketchbook | object.paper | sketch:9 drawing:8 pencil:6
sketch | activity.art | sketchbook:9
doodle | activity.art | drawing:8 sketch:8 pen:5
portrait | activity.art | painting:7 face:7 picture:6 selfie:6
landscape | activity.art | painting:6 scenery:8 view:7
scenery | nature.land.habitat | landscape:8 view:7 nature:6
masterpiece | activity.art | painting:7 art:7 famous:5
graffiti | activity.art | wall:7 spray:7 paint:6 street:5
spray | object.misc | paint:5 water:5 mist:6
mural | activity.art | wall:8 painting:7 graffiti:6
calligraphy | activity.art | writing:8 pen:7 ink:7 letter:5
animation | activity.art | cartoon:9 animator:8 movie:6
cartoon | activity.art | animation:9 comic:7 drawing:6
comic | object.paper | cartoon:7 superhero:7 book:6 funny:5
manga | object.paper | comic:9 japan:7 anime:8
anime | activity.art | manga:8 cartoon:7 japan:7
magazine | object.paper | newspaper:7 article:7 book:5
newspaper | object.paper | news:8 article:7 journalist:7
news | activity.study | newspaper:8 reporter:8 television:5 headline:7
headline | object.paper | news:7 newspaper:7
article | object.paper | newspaper:7 magazine:7
encyclopedia | object.paper | dictionary:8 book:7 knowledge:7
dictionary | object.paper | thesaurus:8
thesaurus | object.paper | dictionary:8 word:7 synonym:8
atlas | object.nav | geography:6
fairytale | activity.art | fairy:8 tale:9 princess:6 castle:5 dragon:4
fable | activity.art | tale:8 story:7 moral:7 fox:4
saga | activity.art | story:7 legend:7 epic:7
epic | activity.art | saga:7 legend:6 hero:5 huge:4
mythology | activity.art | myth:9 legend:7 god:6
folklore | activity.art | myth:8 legend:8 tale:7
riddle | activity.study | sphinx:6
rhyme | activity.art | poem:7 rap:6 verse:7
verse | activity.art | poem:8 rhyme:7 song:5
lyric | activity.music | song:8 words:6 singer:5
chorus | activity.music | song:7 choir:7 sing:6
melody | activity.music | hum:5
harmony | activity.music | melody:6 choir:6 peace:5
symphony | activity.music | orchestra:8 classical:7 concert:6
classical | activity.music | symphony:7 orchestra:7 piano:5 beethoven:6
opera | activity.music | aria:8
aria | activity.music | opera:8 song:6
soprano | activity.music | opera:7 singer:6 voice:6
ballad | activity.music | song:8 love:4
lullaby | activity.music | song:8 sleep:7 baby:7 cradle:5
anthem | activity.music | song:7 national:6 flag:5
jingle | activity.music | bell:7 christmas:5 song:5
karaoke | activity.music | sing:8 microphone:8 song:7
disco | activity.music | dance:8 party:6 discoball:8
discoball | object.decoration | disco:8 mirror:6 dance:5
salsa | activity.music | dance:7
tango | activity.music | dance:8 argentina:6
waltz | activity.music | dance:8 ballroom:7
breakdance | activity.music | dance:8 spin:6 hiphop:7
hiphop | activity.music | rap:8 dance:6 music:6
rock | activity.music | guitar:6 band:6 roll:5
punk | activity.music | rock:7 band:5
reggae | activity.music | jamaica:7 music:6
country | activity.music | cowboy:5 guitar:5
pop | activity.music | music:6 popstar:7 song:5 bubble:4
techno | activity.music | electronic:7 dance:6
electronic | activity.music object.tech | techno:7 computer:5
gig | activity.music | concert:9 band:7 stage:6
festival | activity.music | stage:5
tour | activity.leisure | travel:6 band:5 tourist:6
encore | activity.music | concert:7 applause:7
rehearsal | activity.music | practice:8 band:5 play:5
practice | activity.study | rehearsal:8 train:6 learn:6
instrument | object.music | music:8 guitar:6 piano:6 violin:6
tambourine | object.music | drum:6 jingle:6
maracas | object.music | shake:7 rattle:7 mexico:5
triangle | object.music | ding:4 percussion:6
gong | object.music | bell:7 cymbal:6 loud:4
bongo | object.music | drum:9 percussion:7
bagpipes | object.music | scotland:8 kilt:6 pipe:6
harpsichord | object.music | piano:8
synthesizer | object.music | keyboard:8 electronic:7
recorder | object.music object.tech | flute:8 record:5
oboe | object.music | clarinet:7 flute:6 orchestra:5
bassoon | object.music | oboe:7 orchestra:5
piccolo | object.music | flute:9
cornet | object.music | trumpet:9
bugle | object.music | trumpet:8 army:5
lute | object.music | guitar:7 harp:6
mandolin | object.music | guitar:7 banjo:7
sitar | object.music | guitar:6 india:6
didgeridoo | object.music | australia:8 pipe:5
keytar | object.music | keyboard:7 guitar:6
amplifier | object.music | speaker:8 guitar:6 loud:6
microphone | object.tech | podcast:5
note | activity.music | music:6 piano:5 melody:5 letter:4
chord | activity.music | guitar:7 piano:6 harmony:6
tempo | activity.music | speed:6
beat | activity.music | drummer:6
solo | activity.music | alone:6 guitar:5 performance:6
duet | activity.music | two:6 sing:6 pair:6
band | activity.music | gig:6
movie | activity.art | blockbuster:7
blockbuster | activity.art | movie:7 hit:6 popular:5
sequel | activity.art | movie:7 book:5
trailer | activity.art | movie:6
comedy | activity.art | funny:8 joke:7 laugh:7 comedian:7
drama | activity.art | theater:7 play:6 actor:5
tragedy | activity.art | drama:7 sad:7
horror | activity.art | scary:7 monster:5
thriller | activity.art | suspense:8 movie:6 mystery:6
suspense | feeling.mind | thriller:8 tension:7 mystery:6
documentary | activity.art | film:7 nature:5 history:5
musical | activity.art | sing:7 dance:6 theater:7
sitcom | activity.art | comedy:8 television:7 funny:6
cartoonnetwork | activity.art | cartoon:8
episode | activity.art | series:8 show:7 television:6
series | activity.art | episode:8 show:7
show | activity.art | television:6 stage:6 performance:7
performance | activity.art | show:7 stage:7 concert:6 actor:5
audition | activity.art | actor:7 singer:6 talent:6
talent | feeling.positive | skill:8 gift:5 audition:6
skill | feeling.positive | talent:8 practice:6 expert:6
oscar | object.misc | award:8 trophy:7 movie:6 actor:5
award | object.misc | prize:9 trophy:8 medal:7 oscar:8
prize | object.misc | award:9 win:7 jackpot:6
ticket | object.paper | admission:6
popcorn | food.snack | cinema:5
redcarpet | object.misc | celebrity:8 famous:6 oscar:7
paparazzi | person.job | camera:7 celebrity:8 photo:7
autograph | object.paper | celebrity:8 signature:9 fan:7
signature | object.paper | autograph:9 name:6 pen:5
fame | feeling.positive | famous:9 celebrity:8

# ───────────── BIG EXPANSION · ACTIONS (VERBS) ─────────────
walk | action.move | stroll:9
stroll | action.move | walk:9 wander:7
stride | action.move | walk:8 step:7
march | action.move | stomp:6
tiptoe | action.move | sneak:7 quiet:6 walk:6
sneak | action.move | tiptoe:7 spy:6 hide:6
creep | action.move | sneak:8 crawl:7 creepy:5
crawl | action.move | baby:6 creep:7 worm:5 slow:5
limp | action.move | hurt:6 walk:5
stumble | action.move | trip:8 fall:7
trip | action.move | stumble:8 fall:6
slip | action.move | slippery:7 banana:4 fall:6
tumble | action.move | fall:8 roll:6
roll | action.move | tumble:6 ball:6 wheel:6 dice:4
spin | action.move | twirl:8 turn:7 wheel:5 top:4
twirl | action.move | spin:8 dance:6
turn | action.move | spin:7 rotate:8 left:5
rotate | action.move | turn:8 spin:7
dash | action.move | sprint:8 run:7 rush:7
hurry | action.move | rush:8 fast:6 quick:6 late:5
race | action.move | run:6
chase | action.move | run:6 catch:6 tag:5
flee | action.move | escape:8 run:7
hide | action.move | seek:7 secret:6 camouflage:6
seek | action.move | search:8 find:8 hide:7
search | action.move | seek:8 find:8 look:7
find | action.move | discover:8 search:8 lose:6 treasure:5
discover | action.move | find:8 explore:7 invent:5
lose | action.daily | win:7 find:6 lost:8
lost | quality.other | lose:8 map:5 missing:8
missing | quality.other | lost:8 gone:7
arrive | action.move | arrival:7 come:7 leave:6
leave | action.move | go:7 depart:8 arrive:6
depart | action.move | leave:8 departure:8
enter | action.move | entrance:8 door:6 exit:7
exit | action.move | leave:7 door:6 enter:7
return | action.move | come:6 back:6 boomerang:5
come | action.move | arrive:7 go:6
go | action.move | leave:7 come:6
push | action.move | pull:8 shove:8 press:6
pull | action.move | push:8 drag:8 rope:5 tug:8
drag | action.move | pull:8 tow:7
tow | action.move | pull:7 drag:7 truck:5
tug | action.move | pull:8 rope:6 tugboat:6
lift | action.move | raise:8 carry:6 elevator:6 heavy:5
raise | action.move | lift:8 rise:7 up:5
lower | action.move | drop:6 down:6
carry | action.move | hold:6 lift:6 bag:5
hold | action.move | grip:8 grab:7 carry:6 hand:5
grab | action.move | grip:7 snatch:8 hold:7 catch:6
grip | action.move | grab:7 hold:8 hand:6
snatch | action.move | grab:8 steal:6
drop | action.move | fall:7 let:5
toss | action.move | throw:9 flip:6 coin:4
hurl | action.move | throw:9 toss:7
bounce | action.move | ball:6 trampoline:7 spring:5 jump:6
kick | action.move | punch:6
punch | action.move | hit:7
hit | action.move | strike:8 punch:7 smash:6 bat:4
strike | action.move | hit:8 lightning:5 bowling:5 match:4
smash | action.move | break:8 crash:7 hit:6 glass:5
crash | action.move | smash:7 accident:8 car:5 bang:5
break | action.make | smash:8 crack:7 broken:7 fix:6
fix | action.make | repair:9 mend:9 break:6 tool:5
repair | action.make | fix:9 mend:8 mechanic:7
mend | action.make | fix:9 repair:8 sew:6
make | action.make | build:7 create:9 craft:7
create | action.make | make:9 invent:7 art:5
invent | action.make | inventor:9 invention:9 create:7
craft | action.make | make:7 art:6 handmade:6
design | action.make | create:7 plan:6 draw:6
plan | action.daily | idea:6 map:5 design:6
assemble | action.make | build:8 construct:7
construct | action.make | build:9 construction:8
destroy | action.make | wreck:8 ruin:8 smash:7 build:5
wreck | action.make | destroy:8 crash:7 shipwreck:7
ruin | action.make | destroy:8 ruins:6
cut | action.make | slice:8 chop:8 scissors:7 knife:7
chop | action.make | cut:8 axe:8 wood:5
slice | action.make | cut:8 knife:6 bread:5 pizza:5
dice | action.make | chop:6
grate | action.make | grater:9 cheese:6
mix | action.make | stir:8 blend:8 whisk:6 bowl:5
stir | action.make | mix:8 spoon:7 soup:5
blend | action.make | mix:8 blender:8
pour | action.make | jug:5
bake | action.make | baking:9
grill | action.make | barbecue:7
fry | action.make | fried:8
fried | quality.taste | fry:8 chips:5 chicken:5
roasted | quality.taste | roast:9 marshmallow:5
melt | action.make | ice:7 wax:6 snow:6 hot:5 chocolate:4
freeze | action.make | ice:9 frozen:9 cold:7
thaw | action.make | melt:8 ice:6 spring:4
boil | action.make | kettle:6
heat | action.make | warm:6
cool | action.make | chill:7
wash | action.daily | scrub:8 rinse:8
scrub | action.daily | wash:8 clean:7 brush:6
rinse | action.daily | wash:8 water:6
dry | action.daily | towel:6
wipe | action.daily | clean:7 cloth:7 towel:5
sweep | action.daily | broom:9 floor:6 dust:6
dust | action.daily | duster:7
polish | action.daily | shine:8 shiny:7 clean:6
tidy | action.daily | clean:8 neat:8 mess:6
mess | quality.other | messy:9 tidy:6 dirty:6
messy | quality.other | mess:9 untidy:9 dirty:6
dirty | quality.other | mud:6 clean:7 messy:6 filthy:9
fold | action.make | paper:6 origami:7 clothes:5
pack | action.daily | suitcase:7 bag:6 unpack:7
unpack | action.daily | pack:7 suitcase:6
wrap | action.daily | gift:7 paper:6 present:6
open | action.daily | close:8 door:6 unlock:6 box:5
close | action.daily | shut:9 open:8 door:6
shut | action.daily | close:9 door:6
lock | action.daily | key:8
knock | action.daily | door:8 tap:6
ring | action.daily | doorbell:6
wait | action.daily | queue:7 patient:7 time:5
queue | action.daily | line:8 wait:7
rest | action.daily | relax:8 sleep:7 nap:7 tired:6
relax | action.daily | rest:8 calm:7 chill:6 holiday:5
wake | action.daily | alarm:7 morning:6 sleep:6
dream | action.daily | sleep:6
eat | action.daily | swallow:6 taste:6
drink | action.daily | gulp:7 sip:7 thirst:7
swallow | action.daily | gulp:8 eat:6 throat:5
gulp | action.daily | swallow:8 drink:7
lick | action.daily | tongue:8 lollipop:6 icecream:6
nibble | action.daily | bite:8 mouse:5 chew:6
munch | action.daily | chew:8 eat:7 crunch:7
crunch | action.daily | crunchy:8 munch:7
taste | action.daily | flavor:8 tongue:7 delicious:6 sweet:5
smell | action.daily | sniff:7
sniff | action.daily | nose:8 smell:7
listen | action.daily | hear:9 ear:8 music:5
hear | action.daily | listen:9
watch | action.daily | see:7 television:5
look | action.daily | stare:7 glance:7
stare | action.daily | look:7 gaze:9 eye:5
gaze | action.daily | stare:9 look:7
glance | action.daily | look:7 peek:7
peek | action.daily | peep:9 glance:7 hide:5
peep | action.daily | peek:9
spy | action.daily | watch:6 secret:6
notice | action.daily | see:7 spot:7
spot | action.daily | notice:7 see:6 find:6
touch | action.daily | feel:8 hand:6 finger:6
feel | action.daily | touch:8 emotion:6
tickle | action.daily | laugh:7 giggle:7 feather:5
poke | action.daily | prod:8 finger:6 touch:5
pinch | action.daily | squeeze:7 crab:5 finger:5
squeeze | action.daily | hug:6 press:7 pinch:7 lemon:4
press | action.daily | push:7 button:7 squeeze:6
pat | action.daily | stroke:7 pet:6 dog:4
stroke | action.daily | pat:7 pet:6 cat:5
wave | action.daily | hello:7 goodbye:7 hand:6
point | action.daily | finger:7 direction:6
clap | action.daily | hands:5
nod | action.daily | yes:7 head:7 agree:6
shake | action.daily | tremble:7 earthquake:6 hand:5
shrug | action.daily | shoulder:8 dunno:6
bow | action.daily | curtsy:7 king:4 respect:6
kneel | action.daily | knee:7 pray:5 knight:4
sit | action.daily | chair:7
stand | action.daily | sit:6 up:5 stage:4
lie | action.daily | bed:5 truth:7 fib:8
sleep | action.daily | doze:8
doze | action.daily | nap:8 sleep:8 snooze:9
snooze | action.daily | doze:9 alarm:7 nap:7
talk | action.daily | speak:9 chat:8 say:7 voice:6
speak | action.daily | talk:9 say:8 voice:7
say | action.daily | speak:8 tell:7 word:6
tell | action.daily | say:7 story:6
chat | action.daily | talk:8 gossip:7 message:5
gossip | action.daily | chat:7 rumor:8 secret:6
whisper | action.daily | murmur:7
mumble | action.daily | murmur:8 mutter:9 whisper:6
mutter | action.daily | mumble:9
murmur | action.daily | mumble:8 whisper:7
yell | action.daily | shout:9 scream:8 loud:6
shout | action.daily | yell:9
scream | action.daily | shriek:9 yell:8
shriek | action.daily | scream:9
cheer | action.daily | celebrate:7 applause:7 hooray:8 crowd:5
sing | action.daily | hum:6
hum | action.daily | sing:6 bee:4 song:5
whistle | action.daily | tune:5
laugh | action.daily | chuckle:8 giggle:9 snicker:7
giggle | action.daily | laugh:9 chuckle:7
chuckle | action.daily | laugh:8 giggle:7
grin | action.daily | smile:9 happy:6
frown | action.daily | sad:7 smile:5 face:5 angry:5
sigh | action.daily | breath:6 tired:5 relief:6
sob | action.daily | cry:9 weep:8 tears:7
weep | action.daily | cry:9 sob:8
gasp | action.daily | breath:7 surprise:7 shock:6
pant | action.daily | breath:7 tired:6 dog:4
breathe | action.daily | inhale:8 exhale:8
inhale | action.daily | breathe:8 exhale:7
exhale | action.daily | breathe:8 inhale:7
ask | action.daily | question:8 answer:6
answer | action.daily | reply:9 respond:8 question:8
reply | action.daily | answer:9 respond:8 message:5
explain | action.daily | describe:8 teach:7 tell:6
describe | action.daily | explain:8 tell:6
teach | action.daily | teacher:9 learn:7 lesson:7 school:6
learn | action.daily | study:8
study | action.daily | homework:6
remember | action.daily | recall:8
recall | action.daily | remember:8 memory:8
forget | action.daily | remember:7
guess | action.daily | riddle:6 answer:6 clue:6 puzzle:5
wonder | action.daily | think:6
imagine | action.daily | dream:7 pretend:8 idea:6 fantasy:6
pretend | action.daily | imagine:8 fake:7 actor:5
believe | action.daily | trust:7 faith:7 hope:5
trust | feeling.positive | believe:7 faith:7 friend:5
decide | action.daily | choose:8 pick:7
choose | action.daily | pick:9 decide:8 select:9
pick | action.daily | choose:9 select:8 flower:4
select | action.daily | choose:9 pick:8
count | action.daily | number:8 math:6 add:6
add | action.daily | plus:8 sum:7 count:6
subtract | action.daily | minus:8 take:5
multiply | action.daily | times:7 math:6
divide | action.daily | split:8 share:6 math:6
share | action.daily | give:7 divide:6 friend:5
give | action.daily | gift:7 share:7 take:6
take | action.daily | grab:6 give:6 steal:5
borrow | action.daily | lend:9 library:5 return:5
lend | action.daily | borrow:9 give:5
buy | action.daily | purchase:9 shop:8 sell:7 money:6
purchase | action.daily | buy:9
sell | action.daily | buy:7 shop:6 market:6
pay | action.daily | money:7 bill:6 buy:6
spend | action.daily | money:7 buy:6 shop:5
save | action.daily | rescue:7 money:5 keep:6
earn | action.daily | money:7 work:6 salary:7
win | action.daily | victory:9 lose:7 prize:7 champion:6
compete | action.daily | competition:9 race:7 rival:6
help | action.daily | assist:9 aid:8 rescue:6
assist | action.daily | help:9 assistant:8
protect | action.daily | guard:8 shield:7 safe:6
attack | activity.conflict | fight:8 battle:7 defend:6
defend | activity.conflict | protect:8 attack:6 shield:6
fight | activity.conflict | argue:6
argue | action.daily | quarrel:9 fight:6 debate:7
quarrel | action.daily | argue:9 fight:6
agree | action.daily | yes:7 nod:6
apologize | action.daily | sorry:9 forgive:7
forgive | action.daily | sorry:7 apologize:7
thank | action.daily | grateful:8 thanks:9 please:6
thanks | action.daily | thank:9
please | action.daily | polite:7 thank:6
greet | action.daily | hello:8 welcome:7 wave:6
hello | action.daily | hi:9 greet:8 goodbye:6 wave:6
hi | action.daily | hello:9
goodbye | action.daily | farewell:9 bye:9 hello:6 wave:6
bye | action.daily | goodbye:9
farewell | action.daily | goodbye:9
welcome | action.daily | greet:7 hello:6 doormat:5
invite | action.daily | invitation:9 party:6 guest:6
invitation | object.paper | invite:9 party:6 wedding:5
visit | action.daily | visitor:8 guest:6 trip:5
meet | action.daily | greet:6 meeting:8 friend:5
meeting | activity.study | office:6 meet:8 boss:5
join | action.daily | team:6 club:6 member:7
member | person.family | club:7 team:6 join:7
play | action.daily | playtime:7
playtime | time.day | play:7 playground:6
celebrate | action.daily | cheer:6
dance | action.daily | boogie:7
travel | action.move | journey:7
fly | action.move | flight:6
float | action.move | sink:6
sink | action.move | float:6 shipwreck:5 drown:7
drown | action.move | sink:7 water:5
swim | action.move | paddle:5
dive | action.move | plunge:8
plunge | action.move | dive:8
climb | action.move | scale:5
dig | action.make | shovel:7
plant | action.make | seed:6 garden:6
water | action.make | plant:3
grow | action.make | bloom:5
hunt | action.move | prey:6 hunter:9 track:5
track | action.move | follow:7 hunt:5 footprint:7
follow | action.move | track:7 chase:6 lead:5
lead | action.move | guide:8 follow:5 leader:7
guide | person.job | lead:8 tour:6 map:5
steer | action.move | drive:7 wheel:6 boat:5
park | action.move | car:6 parking:7
ride | action.move | cycle:7
cycle | action.move | bicycle:9 bike:8 ride:7
row | action.move | canoe:5
sail | action.move | voyage:5
skate | action.move | rink:6
ski | action.move | slope:6
surf | action.move | surfer:8
paint | action.make | painter:8
draw | action.make | pencil:6
write | action.daily | pencil:7
read | action.daily | reading:9
type | action.daily | typing:9
typing | action.daily | type:9 keyboard:8
print | action.make | press:5
copy | action.make | duplicate:8 clone:8 paste:6
paste | action.make | copy:6
delete | action.make | erase:9 remove:8 computer:4
erase | action.make | delete:9 eraser:8 rubber:6
remove | action.make | delete:8 take:6
send | action.daily | mail:7 message:7 post:7 email:6
receive | action.daily | get:8 send:6 gift:5
post | action.daily | mail:8 send:7 letter:6
deliver | action.daily | delivery:9 courier:7 parcel:7
delivery | activity.study | deliver:9 pizza:5 parcel:7 courier:8
call | action.daily | dial:7
dial | action.daily | phone:7 call:7 number:5
text | action.daily | message:8 phone:7

# ───────────── BIG EXPANSION · DESCRIBING WORDS, FEELINGS, IDEAS ─────────────
good | quality.other | great:8 nice:8 bad:7 best:7
bad | quality.other | good:7 terrible:8 awful:8 evil:5
great | quality.other | good:8 awesome:8 excellent:8
nice | quality.other | kind:7 good:8 pleasant:8
awesome | quality.other | amazing:9 great:8 cool:6
amazing | quality.other | awesome:9 incredible:9 wonderful:8
incredible | quality.other | amazing:9 unbelievable:8
wonderful | quality.other | amazing:8 marvelous:9 lovely:7
excellent | quality.other | great:8 perfect:7 best:7
perfect | quality.other | flawless:9 ideal:8 excellent:7
best | quality.other | good:7 champion:5 winner:5
worst | quality.other | bad:8 terrible:8
terrible | quality.other | awful:9 horrible:9 bad:8
awful | quality.other | terrible:9 horrible:8
horrible | quality.other | terrible:9 awful:8 nasty:7
nasty | quality.other | horrible:7 mean:6
lovely | quality.other | beautiful:8 wonderful:7 nice:7
beautiful | quality.other | pretty:9 gorgeous:9 lovely:8 ugly:6
pretty | quality.other | beautiful:9 cute:7
gorgeous | quality.other | beautiful:9 stunning:8
stunning | quality.other | gorgeous:8 amazing:7
ugly | quality.other | beautiful:6 hideous:9 monster:4 troll:5
hideous | quality.other | ugly:9
cute | quality.other | adorable:9 puppy:5 kitten:5 sweet:5
adorable | quality.other | cute:9
fancy | quality.other | elegant:8 posh:8 luxury:6
elegant | quality.other | graceful:8 fancy:8 swan:4
posh | quality.other | fancy:8 rich:6
luxury | quality.other | expensive:8 fancy:6 yacht:5 caviar:5
expensive | quality.other | cheap:8 price:6 luxury:8 money:5
cheap | quality.other | expensive:8 bargain:7
bargain | quality.other | cheap:7 sale:7
free | quality.other | gratis:8 cheap:5 liberty:7
rich | quality.other | treasure:4
wealthy | quality.other | rich:9
poor | quality.other | broke:7
famous | quality.other | wellknown:8
popular | quality.other | famous:7 cool:5 trendy:7
trendy | quality.other | fashion:7 popular:7 cool:6
cool | quality.other | awesome:6 trendy:6
boring | quality.other | dull:8 bored:8 tedious:9
tedious | quality.other | boring:9
fun | quality.other | exciting:7 enjoy:7
exciting | quality.other | thrilling:9 fun:7 adventure:6
thrilling | quality.other | exciting:9 rollercoaster:5
easy | quality.other | simple:9 hard:7 difficult:8
simple | quality.other | easy:9 plain:6
difficult | quality.other | hard:9 tough:8 easy:8 tricky:8
tough | quality.other | hard:8 strong:6 difficult:8
tricky | quality.other | difficult:8 puzzle:5
strange | quality.other | weird:9 odd:9 mystery:5
weird | quality.other | strange:9 odd:8 bizarre:8
odd | quality.other | strange:9 weird:8 even:6
bizarre | quality.other | weird:8 strange:8
normal | quality.other | ordinary:9 usual:8 typical:8
ordinary | quality.other | normal:9 plain:6
usual | quality.other | normal:8 common:7
common | quality.other | usual:7 rare:7 ordinary:7
rare | quality.other | common:7 unique:7 precious:6
unique | quality.other | special:8 rare:7 one:4
special | quality.other | unique:8 rare:6
precious | quality.other | valuable:9 rare:6 jewel:6 gold:5
valuable | quality.other | precious:9 treasure:6
important | quality.other | vital:8 serious:6
serious | quality.other | important:6 funny:5
silly | quality.other | funny:7 goofy:8 clown:5
goofy | quality.other | silly:8 clumsy:6
clumsy | quality.other | awkward:7 trip:5
awkward | quality.other | clumsy:7 shy:5
gentle | quality.other | soft:7 kind:6 calm:6
rough | quality.other | bumpy:7 smooth:7 tough:5
smooth | quality.other | silky:8 rough:7 soft:6 flat:5
bumpy | quality.other | rough:7 road:4
sharp | quality.other | blunt:7 knife:7 pointy:8
blunt | quality.other | sharp:7 dull:5
pointy | quality.other | sharp:8 spike:6 star:3
sticky | quality.other | glue:8 honey:6 tape:6
slimy | quality.other | slime:9 snail:6 slug:6
slippery | quality.other | ice:6 slip:7 eel:5
fluffy | quality.other | soft:7 cloud:6 sheep:5 kitten:5
fuzzy | quality.other | fluffy:8 peach:4 blurry:5
furry | quality.other | fur:9 fluffy:7 bear:4
hairy | quality.other | hair:8 furry:7
bald | quality.other | hair:6 head:5
shiny | quality.other | gleaming:8
gleaming | quality.other | shiny:8 sparkle:6
glossy | quality.other | shiny:8 smooth:6
dusty | quality.other | dust:9 old:5 attic:5
muddy | quality.other | mud:9 dirty:7 puddle:6
wet | quality.other | soggy:8
soggy | quality.other | wet:8 damp:7
dry | quality.other | crispy:5
crispy | quality.taste | crunchy:8 crisp:7 fried:6 bacon:4
crunchy | quality.taste | crispy:8 apple:5 crunch:8
juicy | quality.taste | fruit:6 orange:5 watermelon:6
tasty | quality.taste | delicious:9 yummy:9 flavor:6
delicious | quality.taste | tasty:9 yummy:9 food:6
yummy | quality.taste | delicious:9 tasty:9
salty | quality.taste | salt:9 chips:6 sea:4
savory | quality.taste | salty:7 tasty:6
bland | quality.taste | plain:7 boring:5 tasteless:8
flavor | quality.taste | taste:8 flavour:9 spice:5
flavour | quality.taste | flavor:9
creamy | quality.taste | cream:9 smooth:6
rotten | quality.taste | rot:9 bad:6 smell:6 egg:4
stale | quality.taste | old:6 bread:6
ripe | quality.taste | fruit:7 banana:6 ready:5
raw | quality.taste | uncooked:9 sushi:5 meat:4
burnt | quality.taste | burn:9 toast:6 black:4
frozen | quality.temp | icy:7
lukewarm | quality.temp | warm:7 tepid:9
tepid | quality.temp | lukewarm:9
fresh | quality.other | new:5
old | quality.other | ancient:7
young | quality.age | child:6 youth:8 old:6 baby:5
youth | quality.age | young:8 teenager:6
modern | quality.other | new:7 futuristic:7 old:5
futuristic | quality.other | future:8 robot:6 spaceship:5
vintage | quality.other | retro:8 old:7 antique:8
retro | quality.other | vintage:8 pixel:5 old:6
antique | quality.other | vintage:8 old:8 museum:5
new | quality.other | brandnew:9
early | time.day | late:7 morning:6 dawn:5
late | time.day | early:7 night:5 delay:7
soon | time.day | later:7 now:6
now | time.day | today:6 instant:6
later | time.day | soon:7 tomorrow:6
never | time.unit | always:7 forever:5
always | time.unit | forever:7 never:7
sometimes | time.unit | often:6
often | time.unit | always:5 sometimes:6
fast | quality.other | speedy:9
speedy | quality.other | fast:9
slow | quality.other | sluggish:8
sluggish | quality.other | slow:8 lazy:6
lazy | quality.other | sloth:7 sleepy:6 tired:5
busy | quality.other | hectic:8 work:5
hectic | quality.other | busy:8 chaos:6
noisy | quality.other | loud:9 noise:8
silent | quality.other | quiet:9 silence:9
bright | quality.other | dim:6
dim | quality.other | dark:7 bright:6 faint:7
faint | quality.other | dim:7 weak:6 pale:5
heavy | quality.size | light:4
light | quality.size | heavy:5 feather:4
strong | quality.other | weak:8 muscle:8 powerful:9 tough:6
powerful | quality.other | strong:9 power:8 mighty:9
mighty | quality.other | powerful:9 strong:8
weak | quality.other | strong:8 feeble:9 tired:5
feeble | quality.other | weak:9
brave | feeling.positive | fearless:9 heroic:8
fearless | feeling.positive | brave:9
heroic | feeling.positive | brave:8 hero:9
coward | feeling.negative | scared:7 brave:6 chicken:4
shy | feeling.negative | timid:9 quiet:6 blush:7
timid | feeling.negative | shy:9
bold | feeling.positive | daring:8 brave:8
daring | feeling.positive | bold:8 brave:7 adventure:5
proud | feeling.positive | pride:9 happy:5
humble | feeling.positive | modest:9 proud:5
modest | feeling.positive | humble:9
kind | feeling.positive | caring:8 nice:7 gentle:6 friendly:7
caring | feeling.positive | kind:8 love:5
friendly | feeling.positive | kind:7 friend:7 nice:7
polite | feeling.positive | manners:8 please:7 rude:7
rude | feeling.negative | polite:7 mean:7
mean | feeling.negative | cruel:8 nasty:6 rude:7 kind:5
cruel | feeling.negative | mean:8 evil:6
greedy | feeling.negative | selfish:8 money:5 gold:4
selfish | feeling.negative | greedy:8
generous | feeling.positive | kind:7 give:7 share:6
honest | feeling.positive | truth:8 trust:6 lie:5
truth | feeling.mind | honest:8 lie:7 fact:7
lie | feeling.negative | truth:7
loyal | feeling.positive | faithful:9 dog:5 friend:6
faithful | feeling.positive | loyal:9
patient | feeling.positive | wait:6 calm:6
grateful | feeling.positive | thankful:9 thank:8
thankful | feeling.positive | grateful:9
cheerful | feeling.positive | happy:9 jolly:8 sunny:5
jolly | feeling.positive | cheerful:8 santa:5 happy:7
glad | feeling.positive | happy:9
delighted | feeling.positive | happy:8 thrilled:8 delight:9
thrilled | feeling.positive | excited:8 delighted:8
excited | feeling.positive | thrilled:8 happy:6 excitement:9
excitement | feeling.positive | excited:9 thrill:8
thrill | feeling.positive | excitement:8 rollercoaster:5
calm | feeling.positive | relaxed:8
relaxed | feeling.positive | calm:8 relax:8
peaceful | feeling.positive | calm:9 quiet:6 peace:8
content | feeling.positive | satisfied:8 happy:7
satisfied | feeling.positive | content:8 full:5
relief | feeling.positive | relieved:9 sigh:6 phew:7
relieved | feeling.positive | relief:9
hopeful | feeling.positive | hope:9 optimistic:8
optimistic | feeling.positive | hopeful:8 positive:7
confident | feeling.positive | brave:6 sure:7 proud:5
curious | feeling.mind | nosy:6
surprised | feeling.positive | surprise:9 shocked:8 amazed:7
amazed | feeling.positive | amazing:7 surprised:7 wow:7
shocked | feeling.negative | surprised:8 shock:9
shock | feeling.negative | surprise:7 gasp:6 electric:5
wow | feeling.positive | amazed:7 amazing:6
nervous | feeling.negative | anxious:9 worried:8 scared:6 jitters:7
anxious | feeling.negative | nervous:9 worried:8 anxiety:9
worried | feeling.negative | anxious:8 nervous:8 worry:9
worry | feeling.negative | worried:9 fear:6 stress:7
stress | feeling.negative | worry:7 pressure:7 tired:5
anxiety | feeling.negative | anxious:9 fear:7 worry:7
panic | feeling.negative | fear:7 alarm:6 scream:5
terror | feeling.negative | fear:9 horror:8
dread | feeling.negative | fear:8 doom:6
frightened | feeling.negative | scared:9 afraid:9
spooked | feeling.negative | scared:8 ghost:5
upset | feeling.negative | sad:8 angry:5 cry:5
unhappy | feeling.negative | sad:9 miserable:8
miserable | feeling.negative | sad:8 unhappy:8 gloomy:7
gloomy | feeling.negative | sad:7 dark:6 cloudy:5
sorrow | feeling.negative | sad:9 grief:8
grief | feeling.negative | sorrow:8 sad:8 loss:6
heartbroken | feeling.negative | sad:8 heart:6 love:5
homesick | feeling.negative | home:7 lonely:7 miss:6
miss | feeling.negative | lonely:6
regret | feeling.negative | sorry:8 guilt:7
sorry | feeling.negative | apologize:9 regret:8
embarrassed | feeling.negative | shame:7 blush:8 awkward:6
jealousy | feeling.negative | jealous:9 envy:9
frustrated | feeling.negative | annoyed:8 angry:7
annoyed | feeling.negative | irritated:9 angry:7 frustrated:8
irritated | feeling.negative | annoyed:9
furious | feeling.negative | angry:9 rage:8 mad:8
mad | feeling.negative | angry:9 crazy:6
rage | feeling.negative | fury:8
fury | feeling.negative | rage:8 anger:8
grumpy | feeling.negative | cranky:9 moody:7 angry:5
cranky | feeling.negative | grumpy:9
moody | feeling.negative | grumpy:7
confused | feeling.mind | puzzled:9 lost:5 question:5
puzzled | feeling.mind | confused:9 puzzle:6
bored | feeling.negative | boring:8
sleepy | quality.other | tired:9 yawn:7 bed:5
exhausted | quality.other | tired:9 sleepy:6
hungry | quality.other | starving:9
starving | quality.other | hungry:9
thirsty | quality.other | thirst:9 drink:6
full | quality.other | empty:7 satisfied:5
empty | quality.other | full:7 hollow:7 nothing:6
hollow | quality.other | empty:7 tree:3
emotion | feeling.mind | feeling:9 happy:5 sad:5 mood:7
feeling | feeling.mind | emotion:9 feel:7 mood:6
mood | feeling.mind | emotion:7 feeling:6
friendship | feeling.positive | friend:9 buddy:6 love:5
kindness | feeling.positive | kind:9 caring:7
respect | feeling.positive | honor:7 polite:6
freedom | feeling.positive | liberty:9 free:8
liberty | feeling.positive | freedom:9 statue:4
justice | activity.study | law:7 judge:7 fair:6
fairness | feeling.positive | fair:8 justice:7
power | feeling.positive | strength:7
strength | feeling.positive | strong:9 power:7 muscle:6
energy | feeling.positive | lively:6
lively | quality.other | energetic:9 active:7
energetic | quality.other | lively:9 energy:8 active:7
active | quality.other | energetic:7 sport:5
idea | feeling.mind | brainstorm:7
thought | feeling.mind | idea:9 think:8 mind:7
knowledge | feeling.mind | wisdom:7 learn:7 smart:6 book:5
smart | quality.other | clever:9 intelligent:9 brain:6
clever | quality.other | smart:9 fox:4
intelligent | quality.other | smart:9 clever:8 brain:6
wise | quality.other | wisdom:9 owl:6
foolish | quality.other | silly:7 stupid:8 clown:4
stupid | quality.other | foolish:8 dumb:8 silly:6
crazy | quality.other | mad:6 wild:6 silly:6
wild | quality.other | crazy:6 jungle:5 animal:5
tame | quality.other | wild:6 pet:6
magic | person.fantasy | magical:9
magical | person.fantasy | magic:9 fairy:6 enchanted:8
enchanted | person.fantasy | magical:8 spell:6 forest:4
mysterious | feeling.mind | mystery:9 secret:7 strange:6
secretive | feeling.mind | secret:9
hidden | quality.other | secret:7 hide:8 treasure:4
invisible | quality.other | hidden:7 ghost:5 transparent:6
transparent | quality.other | clear:8 glass:7 invisible:6
clear | quality.other | transparent:8 sky:4 water:4
blurry | quality.other | fuzzy:7 unclear:8
visible | quality.other | invisible:7 see:6
danger | quality.other | dangerous:9
dangerous | quality.other | danger:9 risky:8 safe:6
risky | quality.other | dangerous:8 risk:9
risk | quality.other | danger:8 risky:9
safe | quality.other | secure:8 dangerous:6
secure | quality.other | safe:8 lock:6
chance | feeling.positive | luck:7 random:6
random | quality.other | chance:6 dice:5
fortune | feeling.positive | jackpot:5
destiny | feeling.mind | fate:9 future:6
fate | feeling.mind | destiny:9
wish | feeling.mind | wishingwell:7
miracle | feeling.positive | magic:6 wonder:6
dream | feeling.mind | ambition:6
ambition | feeling.mind | goal:7 dream:6
goal | activity.study | target:6 ambition:7
success | feeling.positive | win:7 victory:7 achieve:7
failure | feeling.negative | fail:9 success:7 lose:6
fail | action.daily | failure:9 lose:6 test:4
achieve | action.daily | success:7 goal:7
challenge | activity.study | difficult:6 test:6 quest:5
adventure | activity.leisure | thrill:5
mystery | feeling.mind | detective:6
surprise | feeling.positive | gift:5
memory | feeling.mind | souvenir:5
silence | quality.other | hush:7
hush | quality.other | quiet:8 silence:7 shh:8
noise | quality.other | racket:5
peace | feeling.positive | quiet:5
war | activity.conflict | soldier:6
truth | feeling.mind | dare:5
dare | action.daily | challenge:7 brave:5 truth:5
promise | action.daily | swear:7 vow:8 trust:6
vow | action.daily | promise:8 wedding:5
secret | feeling.mind | whisper:5

# ───────────── BIG EXPANSION · SCHOOL, NUMBERS, MONEY, SOCIETY, SCIENCE ─────────────
homework | activity.study | assignment:8 essay:6
assignment | activity.study | homework:8 project:7
project | activity.study | assignment:7 plan:5
essay | object.paper | homework:6 write:7 paper:5
exam | activity.study | test:9 quiz:7 grade:7 study:7 school:6
test | activity.study | exam:9 quiz:8 experiment:5
quiz | activity.study | test:8 question:7 trivia:8
trivia | activity.study | quiz:8 fact:6
grade | activity.study | mark:8 exam:7 score:6 school:5
score | activity.study | points:8 grade:6 goal:5
points | activity.study | score:8
report | object.paper | grade:5 news:5
diploma | object.paper | graduate:8 certificate:8 school:5
certificate | object.paper | diploma:8 award:6
graduate | action.daily | graduation:9 diploma:8 university:6
graduation | activity.leisure | graduate:9 diploma:7 cap:5
semester | time.unit | term:9 school:6 college:6
term | time.unit | semester:9 school:5
recess | time.day | break:8 playground:7 school:6
lunchbreak | time.day | lunch:8 break:7
timetable | object.paper | schedule:9 school:5 train:4
schedule | object.paper | timetable:9 calendar:6 plan:6
subject | activity.study | lesson:6 math:5 science:5
math | activity.study | maths:9 mathematics:9 number:8 calculator:7
maths | activity.study | math:9
mathematics | activity.study | math:9
algebra | activity.study | math:8 equation:7
geometry | activity.study | math:8 shape:7 triangle:5
equation | activity.study | math:7 algebra:7
fraction | activity.study | half:7 math:6 divide:5
percent | activity.study | fraction:6 number:6
geography | activity.study | map:8 atlas:7 country:6 earth:5
spelling | activity.study | word:7 letter:6 spell:7
grammar | activity.study | language:7 sentence:7 word:5
language | activity.study | word:7 speak:6 english:7 grammar:7
english | activity.study | language:7 england:6
french | activity.study | france:8 language:7
spanish | activity.study | spain:8 language:7
alphabet | activity.study | letter:8 abc:9 word:5
abc | activity.study | alphabet:9
sentence | activity.study | word:7 grammar:7 paragraph:7
paragraph | activity.study | sentence:7 page:5
vocabulary | activity.study | word:8 dictionary:6
noun | activity.study | word:7 verb:7 grammar:6
verb | activity.study | noun:7 action:5 word:6
synonym | activity.study | thesaurus:7 word:6
music | activity.music | lesson:3
art | activity.art | artclass:4
pe | activity.study | gym:5 sport:5
chalk | object.paper | blackboard:9 chalkboard:9 teacher:6 hopscotch:5
blackboard | object.paper | chalk:9 chalkboard:9 teacher:7 classroom:7
chalkboard | object.paper | blackboard:9 chalk:9
whiteboard | object.paper | marker:8 blackboard:7 classroom:6
marker | object.paper | pen:7 whiteboard:8 highlighter:7
highlighter | object.paper | marker:7 yellow:5
eraser | object.paper | rubber:7 pencil:8 mistake:5
sharpener | object.paper | pencil:9
pencilcase | object.container | pencil:9 pen:7 school:6
protractor | object.tool | angle:8 geometry:7 ruler:6
compass | object.tool | circle:4
glue | object.tool | glitter:4
notebook | object.paper | jotter:8
textbook | object.paper | book:9 school:7 study:6
workbook | object.paper | textbook:7 homework:6
locker | object.container | school:6 gym:6 lock:6
desk | object.furniture | homework:4
library | place.building.public | borrow:5
teacherspet | person.family | teacher:7
number | activity.study | digit:8 count:8 math:7
digit | activity.study | number:8 finger:4
zero | activity.study | nothing:7 none:7 number:6 one:5
one | activity.study | two:7 single:7 first:6 number:5
two | activity.study | one:7 three:7 pair:7 double:6 number:5
three | activity.study | two:7 four:7 triangle:5 number:5
four | activity.study | three:7 five:7 square:4 number:5
five | activity.study | four:7 six:7 hand:4 number:5
six | activity.study | five:7 seven:7 number:5
seven | activity.study | six:7 eight:7 lucky:5 number:5
eight | activity.study | seven:7 nine:7 octopus:5 spider:4 number:5
nine | activity.study | eight:7 ten:7 number:5
ten | activity.study | nine:7 finger:4 number:5
eleven | activity.study | ten:7 twelve:7 number:5
twelve | activity.study | dozen:9 eleven:7 midnight:4 number:5
dozen | activity.study | twelve:9 egg:5
hundred | activity.study | thousand:7 number:6 century:5
thousand | activity.study | hundred:7 million:7 number:6
million | activity.study | thousand:7 billion:8 millionaire:7
billion | activity.study | million:8
millionaire | person.family | rich:8 million:7 money:6
first | activity.study | one:6 winner:6 gold:4 last:6
second | activity.study | two:6 silver:4
third | activity.study | three:6 bronze:4
last | activity.study | first:6 final:7 end:6
final | activity.study | last:7 end:7
half | activity.study | fraction:7 two:5
double | activity.study | twice:8 two:6 pair:6
pair | activity.study | two:7 couple:7 twin:6 socks:4
single | activity.study | one:7 alone:5
few | activity.study | many:6 some:6
many | activity.study | lots:8 few:6
plus | activity.study | add:8 minus:7
minus | activity.study | subtract:8 plus:7
total | activity.study | sum:9 add:6
sum | activity.study | total:9 add:7
coin | object.misc | piggybank:6
penny | object.misc | coin:9 cent:9
cent | object.misc | penny:9 dollar:7
dollar | object.misc | money:9 cent:7 cash:8 america:5
euro | object.misc | money:8 dollar:7 europe:6
pound | object.misc | money:7 weight:5
yen | object.misc | money:7 japan:6
banknote | object.misc | cash:9 money:9 note:6
cash | object.misc | money:9 banknote:9
cheque | object.paper | bank:7 money:6 check:8
check | object.paper | cheque:8 bill:6
creditcard | object.misc | card:7 bank:7 money:7 pay:7
debit | object.misc | creditcard:7 bank:6
piggybank | object.container | money:8 coin:8 save:7 pig:5
savings | object.misc | save:8 money:7 bank:7
salary | object.misc | wage:9 money:8 job:7 pay:7
wage | object.misc | salary:9 pay:7
tax | object.misc | money:6 government:6 accountant:6
loan | object.misc | borrow:8 bank:7 money:6 debt:7
debt | object.misc | loan:7 owe:8 money:6
budget | object.misc | money:7 plan:5 spend:6
profit | object.misc | money:7 business:7 loss:7
loss | object.misc | lose:7 profit:7
discount | object.misc | sale:8 coupon:8 cheap:6
sale | object.misc | discount:8 shop:6 sell:7 bargain:7
shopper | person.family | shopping:8 shop:6
customer | person.family | shop:7 buyer:8 client:8
client | person.family | customer:8
market | place.urban | trader:6
trade | action.daily | swap:8 exchange:8 sell:6 buy:6
swap | action.daily | trade:8 exchange:8
exchange | action.daily | trade:8 swap:8
auction | activity.leisure | sell:7 bid:9 antique:5
bid | action.daily | auction:9
government | activity.study | president:7 law:6 country:6 politics:8
politics | activity.study | government:8 election:7 vote:6
vote | activity.study | ballot:8
ballot | object.paper | vote:8 election:7
democracy | activity.study | vote:8 election:7 freedom:5
parliament | place.building.public | government:8 politics:7
congress | place.building.public | government:7 senator:7
council | activity.study | mayor:6 government:6
law | activity.study | rule:7
rule | activity.study | law:7 ruler:5
police | person.job | jail:5
army | activity.conflict | troop:7
navy | activity.conflict | ship:6 sailor:6 admiral:7
airforce | activity.conflict | pilot:7 plane:6
flag | object.misc | country:6 pole:6 wave:4 pirate:4 nation:6
anthem | activity.music | country:4
capital | place.urban | city:7 country:6
kingdom | place.urban | queen:5
empire | place.urban | emperor:8 kingdom:7 rome:5
republic | place.urban | country:6 democracy:6
charity | activity.study | donate:8 help:6 volunteer:7
donate | action.daily | charity:8 give:7
religion | activity.study | god:7 church:6 pray:6 faith:7
god | person.fantasy | heaven:7 pray:6 religion:7
goddess | person.fantasy | god:8 myth:6
heaven | person.fantasy | angel:8 god:7 sky:5 paradise:7
hell | person.fantasy | devil:8 fire:5 heaven:6
angel | person.fantasy | heaven:8 wing:6 halo:8 harp:4
devil | person.fantasy | hell:8 demon:8 evil:7 horn:4
demon | person.fantasy | devil:8 monster:6 evil:6
halo | object.misc | angel:8 ring:5 light:4
paradise | nature.land.habitat | heaven:7 island:5 tropical:6
pray | action.daily | prayer:9 church:7 god:6
prayer | action.daily | pray:9 church:6
faith | feeling.positive | belief:8 trust:7 religion:7
bible | object.paper | church:7 religion:6 book:6
temple | place.building.public | priest:4
science | activity.study | lab:6
scientific | activity.study | science:9
fact | activity.study | truth:7 knowledge:6 trivia:6
theory | activity.study | idea:6 science:6 einstein:5
discovery | activity.study | discover:9 invention:6 explorer:5
invention | object.tech | lightbulb:5
inventor | person.job | edison:6
einstein | person.family | genius:7 physics:7 relativity:7
newton | person.family | gravity:8 apple:5 physics:7
edison | person.family | lightbulb:7 inventor:6
darwin | person.family | evolution:9 nature:5
evolution | activity.study | darwin:9 dinosaur:4 change:5
dna | body.inner | gene:9 cell:6 biology:6
gene | body.inner | dna:9
cell | body.inner | biology:6 microscope:6 prison:5 phone:4
bacteria | body.inner | germ:9 virus:7
oxygen | material.other | air:7 breathe:7 lung:5 water:4
hydrogen | material.other | water:5 gas:6
carbon | material.other | coal:6 diamond:5 pencil:3
element | activity.study | chemistry:7 atom:6
electron | activity.study | atom:8 electricity:6
proton | activity.study | atom:8 electron:7
nucleus | activity.study | atom:8 cell:5
magnetism | activity.study | magnet:9 physics:6
friction | activity.study | rub:6 physics:6 heat:4
force | activity.study | push:6 gravity:6 strength:5
motion | activity.study | move:7 speed:6
pressure | activity.study | force:6 stress:5 squeeze:5
vacuum | activity.study | space:5
solid | quality.other | hard:7 liquid:6 ice:4
gas | material.other | liquid:5
vapor | material.other | steam:9 gas:7
crystal | material.gem | salt:4
acid | material.other | lemon:4 sour:5 chemistry:6
experiment | activity.study | test:6
hypothesis | activity.study | theory:8 guess:6 experiment:6
data | activity.study | information:8 computer:6 number:5
information | activity.study | data:8 fact:6 news:5
robotics | activity.study | robot:9 engineer:6
technology | object.tech | computer:7 gadget:6 tech:9 science:5
tech | object.tech | technology:9
software | object.tech | program:8 app:7 code:7
hardware | object.tech | computer:6 software:6 tool:4
program | object.tech | software:8 code:7 show:4
code | object.tech | coder:8
bug | object.tech | glitch:8 error:7
glitch | object.tech | bug:8 error:7 pixel:4
error | object.tech | mistake:9 bug:7 wrong:7
mistake | feeling.mind | error:9 wrong:7 oops:7
wrong | quality.other | right:8 mistake:7 error:7
right | quality.other | correct:9 wrong:8 left:5
correct | quality.other | right:9 answer:6
left | quality.other | right:5 direction:5
up | quality.other | down:7 high:5 sky:3
down | quality.other | below:5
inside | quality.other | outside:8 in:7 indoors:8
outside | quality.other | inside:8 outdoors:8 garden:4
indoors | quality.other | inside:8
outdoors | quality.other | outside:8 nature:6 camping:5
above | quality.other | below:8 over:7 up:6 sky:4
below | quality.other | above:8 under:8 down:6
under | quality.other | below:8 beneath:9
beneath | quality.other | under:9
over | quality.other | above:7
near | quality.other | close:8 far:7 nearby:9
far | quality.other | distant:9 near:7 away:7
distant | quality.other | far:9 horizon:5
middle | quality.other | center:8 between:7
edge | quality.other | border:6 cliff:5
corner | quality.other | edge:6 square:4
end | quality.other | finish:8 start:7 last:6
start | quality.other | begin:9 end:7 race:4
begin | quality.other | start:9
finish | quality.other | end:8 race:6 line:4

# ───────────── BIG EXPANSION · COUNTRIES, CITIES, LANDMARKS ─────────────
usa | place.country | america:8 newyork:6 dollar:5
canada | place.country | maple:7 moose:6 hockey:6 snow:4
mexico | place.country | taco:7 sombrero:7 burrito:6 cactus:4
brazil | place.country | carnival:6 amazon:7 football:5 rainforest:5
argentina | place.country | tango:7 football:4
peru | place.country | llama:7 andes:7 inca:7
chile | place.country | andes:6 chili:3
colombia | place.country | coffee:6
cuba | place.country | island:5 cigar:5
jamaica | place.country | reggae:7 island:6
england | place.country | london:9 tea:5 english:7 britain:8
britain | place.country | england:8 london:7 uk:9
uk | place.country | britain:9 england:7
scotland | place.country | kilt:8 bagpipes:8 tartan:7 loch:7
ireland | place.country | shamrock:7 irish:9 green:4
wales | place.country | dragon:5 welsh:9
france | place.country | paris:9 baguette:6 croissant:6 french:8
germany | place.country | berlin:8 german:9 pretzel:5
italy | place.country | rome:8 pizza:7 pasta:7 italian:9
spain | place.country | madrid:8 paella:6 spanish:8 flamenco:6
portugal | place.country | lisbon:8 spain:5
greece | place.country | athens:8 olive:5 parthenon:6
netherlands | place.country | holland:9 tulip:6 windmill:6 amsterdam:8
holland | place.country | netherlands:9 tulip:6 windmill:7 clog:6
belgium | place.country | chocolate:5 waffle:6
switzerland | place.country | alps:8 cheese:5 chocolate:5 watch:4
austria | place.country | alps:7 vienna:8
sweden | place.country | stockholm:8 viking:4
norway | place.country | fjord:8 viking:6
denmark | place.country | lego:5 viking:5
finland | place.country | sauna:6 santa:4
iceland | place.country | volcano:6 geyser:7 glacier:6
russia | place.country | moscow:8 bear:4 snow:4
poland | place.country | warsaw:8
egypt | place.country | cairo:8
morocco | place.country | desert:5 sahara:5
kenya | place.country | safari:7 savanna:6
nigeria | place.country | africa:6
southafrica | place.country | africa:7 safari:6
madagascar | place.country | lemur:8 island:6
india | place.country | curry:7 tiger:5 taj:6 delhi:8
china | place.country | panda:7 dragon:5 beijing:8 chopsticks:5 greatwall:8
japan | place.country | tokyo:9 sushi:7 samurai:6 ninja:6 anime:6
korea | place.country | seoul:8 kimchi:7
thailand | place.country | bangkok:8 elephant:4
vietnam | place.country | pho:6
indonesia | place.country | bali:8 island:5
philippines | place.country | island:5 manila:8
turkey | place.country | istanbul:8 kebab:5
israel | place.country | jerusalem:8
newzealand | place.country | kiwi:8 sheep:5 hobbit:4
hawaii | place.country | surf:7 volcano:6 island:7 ukulele:6 hula:7
alaska | place.country | snow:6 bear:5 moose:5 cold:5
texas | place.country | cowboy:7 ranch:6
california | place.country | hollywood:7 surf:5 beach:4
florida | place.country | beach:6 alligator:6 orange:5
london | place.city | england:9 bigben:8 thames:7 bus:4
paris | place.city | france:9 eiffeltower:9 romance:5 croissant:4
rome | place.city | italy:8 colosseum:8 ancient:6 gladiator:5
venice | place.city | gondola:8 canal:8 italy:6
milan | place.city | italy:7 fashion:6
berlin | place.city | germany:8
madrid | place.city | spain:8
athens | place.city | greece:8 parthenon:7
amsterdam | place.city | netherlands:8 canal:7 bicycle:5
vienna | place.city | austria:8 waltz:5
moscow | place.city | russia:8
tokyo | place.city | japan:9 sushi:5 neon:5
beijing | place.city | china:8
shanghai | place.city | china:8 skyscraper:5
hongkong | place.city | china:6 skyscraper:6 harbor:5
seoul | place.city | korea:8
bangkok | place.city | thailand:8
delhi | place.city | india:8
mumbai | place.city | india:8 bollywood:8
bollywood | activity.art | india:7 movie:7 dance:6 hollywood:7
cairo | place.city | egypt:8 pyramid:6
sydney | place.city | australia:8 operahouse:7 harbor:5
melbourne | place.city | australia:8
newyork | place.city | usa:7 skyscraper:7 taxi:5 statueofliberty:6
hollywood | place.city | movie:8 actor:7 celebrity:7 film:6
lasvegas | place.city | casino:9 gamble:7
chicago | place.city | usa:6 wind:4
dublin | place.city | ireland:8
edinburgh | place.city | scotland:8 castle:5
riodejaneiro | place.city | brazil:8 carnival:7 beach:5
istanbul | place.city | turkey:8
jerusalem | place.city | israel:8
alps | nature.land.relief | mountain:8 switzerland:8 ski:7 snow:6
himalayas | nature.land.relief | everest:9 mountain:8 snow:5
everest | nature.land.relief | himalayas:9 mountain:8 summit:7 climb:6
andes | nature.land.relief | mountain:8 peru:7 llama:5
rockies | nature.land.relief | mountain:8 canada:5
kilimanjaro | nature.land.relief | mountain:8 africa:6
fuji | nature.land.relief | mountain:8 japan:8 volcano:6
amazon | nature.water.fresh | river:8 rainforest:8 brazil:7 jungle:7
mississippi | nature.water.fresh | river:9 usa:5
thames | nature.water.fresh | river:9 london:7
danube | nature.water.fresh | river:9 vienna:5
nile | nature.water.fresh | crocodile:4
ganges | nature.water.fresh | river:9 india:7
niagara | nature.water.fresh | waterfall:9 canada:5
grandcanyon | nature.land.relief | canyon:9 arizona:6
mediterranean | nature.water.sea | sea:8 greece:5 italy:5
caribbean | nature.water.sea | sea:7 island:6 pirate:6 tropical:6
arctic | nature.land.habitat | northpole:8
northpole | nature.land.habitat | santa:8 arctic:8 polar:7 north:7
southpole | nature.land.habitat | antarctica:8 penguin:6 south:7
greatwall | place.building.grand | china:8 wall:7 ancient:5
tajmahal | place.building.grand | india:8 palace:6 marble:5
taj | place.building.grand | tajmahal:9
stonehenge | place.building.grand | stone:8 ancient:7 england:5
statueofliberty | place.building.grand | newyork:7 statue:8 liberty:8 torch:6
operahouse | place.building.grand | sydney:7 opera:8
machupicchu | place.building.grand | peru:8 inca:7 ruins:7 ancient:6
inca | person.adventure | peru:7 machupicchu:7 gold:4
aztec | person.adventure | mexico:6 pyramid:6 temple:5
maya | person.adventure | pyramid:6 mexico:5 calendar:4
roman | person.adventure | rome:8 gladiator:6 empire:6
greek | person.adventure | greece:8 myth:5
egyptian | person.adventure | egypt:9 pharaoh:7 pyramid:6
celtic | person.adventure | ireland:6 scotland:6
irish | person.adventure | ireland:9
scottish | person.adventure | scotland:9
welsh | person.adventure | wales:9
german | person.adventure | germany:9
italian | person.adventure | italy:9
caveman | person.adventure | cave:8 stoneage:8 club:5 mammoth:6
stoneage | time.unit | caveman:8 ancient:6
medieval | time.unit | knight:7 castle:7 middleages:9
middleages | time.unit | medieval:9 knight:5
prehistoric | time.unit | dinosaur:8 caveman:7 ancient:6
jurassic | time.unit | dinosaur:9
iceage | time.unit | mammoth:8 glacier:6 ice:6
victorian | time.unit | history:6
renaissance | time.unit | art:6 painting:5 history:5

# ───────────── BIG EXPANSION · EVERYDAY ODDS & ENDS, FANTASY, WEAPONS ─────────────
spear | object.weapon | javelin:7 sword:6 arrow:5 hunt:5
lance | object.weapon | knight:7 spear:8
axe | object.weapon | battleaxe:8
battleaxe | object.weapon | axe:8 viking:6
mace | object.weapon | club:7 knight:5
club | object.weapon place.building.public | bat:6 caveman:5 dance:4 member:6
crossbow | object.weapon | bow:8 arrow:7
quiver | object.weapon | arrow:9 archer:7 bow:6
sling | object.weapon | slingshot:8 stone:5
whip | object.weapon | crack:5 lion:3 rope:5
trident | object.weapon | neptune:7 fork:5 mermaid:5 sea:4
scimitar | object.weapon | sword:9 pirate:4
rapier | object.weapon | sword:9 fencing:7
cutlass | object.weapon | sword:9 pirate:8
musket | object.weapon | gun:8 pirate:5 cannon:5
pistol | object.weapon | gun:9
rifle | object.weapon | gun:9
bullet | object.weapon | gun:8
bomb | object.weapon | explode:8 explosion:8 dynamite:8
dynamite | object.weapon | bomb:8 explode:8 tnt:9
tnt | object.weapon | dynamite:9
explosion | object.weapon | bomb:8 explode:9 boom:7 firework:5
grenade | object.weapon | bomb:8
missile | object.weapon | rocket:7 bomb:6
helmet | object.clothing.head | knight:4
chainmail | object.weapon | armor:9 knight:7
gauntlet | object.weapon | glove:7 armor:7 knight:6
wizardhat | object.clothing.head | wizard:9 hat:8
broomstick | object.tool | broom:9 witch:8 fly:5
crystalball | object.misc | fortune:8 crystal:7 witch:5 future:6
fortuneteller | person.fantasy | crystalball:8 fortune:8 future:7
spellbook | object.paper | spell:9 wizard:8 magic:7
scroll | object.paper | parchment:8 paper:6 ancient:5 map:5
parchment | object.paper | scroll:8 paper:7 quill:6
treasuremap | object.nav | map:9 treasure:9 pirate:7 x:4
treasurechest | object.container | treasure:9 chest:9 pirate:7 gold:6
goldcoin | object.misc | coin:9 gold:8 treasure:7
doubloon | object.misc | coin:8 pirate:7 gold:6
loot | object.misc | treasure:8 plunder:8 steal:5
plunder | action.make | loot:8 pirate:7 steal:6
cursed | person.fantasy | curse:9 haunted:6
haunt | person.fantasy | ghost:8 haunted:9
poltergeist | person.fantasy | ghost:9 haunted:7
banshee | person.fantasy | ghost:7 scream:7
specter | person.fantasy | ghost:9 phantom:8
wraith | person.fantasy | ghost:8 phantom:7
ghoul | person.fantasy | ghost:7 zombie:7
dracula | person.fantasy | vampire:9 castle:5 transylvania:6
frankenstein | person.fantasy | monster:9 scientist:5 lightning:4
yeti | person.fantasy | bigfoot:8 snow:7 mountain:6 monster:5
bigfoot | person.fantasy | yeti:8 forest:6 monster:5
lochness | person.fantasy | monster:8 scotland:7 loch:8
loch | nature.water.fresh | lake:9 scotland:8
minotaur | animal.myth | maze:8 labyrinth:9 bull:7 myth:7
labyrinth | object.toy | maze:9 minotaur:9
centaur | animal.myth | horse:7 myth:7 archer:5
pegasus | animal.myth | horse:7 wing:7 unicorn:7 myth:6
medusa | person.fantasy | snake:7 stone:6 myth:7
cyclops | person.fantasy | giant:8 eye:7 myth:7
hydra | animal.myth | serpent:7 myth:7 dragon:6
basilisk | animal.myth | serpent:8 snake:7 dragon:5
siren | person.fantasy | mermaid:7
nymph | person.fantasy | fairy:8 forest:5 myth:5
pixie | person.fantasy | fairy:9 elf:7 dust:4
sprite | person.fantasy | fairy:8 pixie:8
gnome | person.fantasy | dwarf:8 garden:6 elf:6 beard:4
dwarf | person.fantasy | gnome:8 elf:6 mine:5 beard:5
leprechaun | person.fantasy | ireland:8 gold:7 rainbow:7 shamrock:6
hobbit | person.fantasy | dwarf:6 elf:5
wizardry | person.fantasy | magic:9 wizard:8
witchcraft | person.fantasy | magic:8 witch:9 spell:7
warlock | person.fantasy | wizard:8 witch:6
mage | person.fantasy | wizard:9
enchantress | person.fantasy | witch:8 sorceress:9
sorceress | person.fantasy | witch:8 sorcerer:9
oracle | person.fantasy | prophecy:8 future:6 wise:5
prophecy | person.fantasy | oracle:8 future:6 destiny:6
quest | activity.leisure | dragon:4
superpower | person.fantasy | superhero:8 power:7 fly:4
sidekick | person.fantasy | superhero:7 hero:6 partner:6
robotdog | object.tech | robot:8 dog:6
cyborg | person.fantasy | robot:8 android:7
android | person.fantasy | robot:9 cyborg:7 phone:4
spaceman | person.job | astronaut:9
martian | person.fantasy | alien:9 mars:9
ufo | person.fantasy | flyingsaucer:9
flyingsaucer | vehicle.space | ufo:9 alien:8
umbrella | object.clothing.wear | brolly:9
brolly | object.clothing.wear | umbrella:9
wallet | object.container | billfold:8
glasses | object.clothing.head | specs:8
spectacles | object.clothing.head | glasses:9
watch | object.tech | wristwatch:9
wristwatch | object.tech | watch:9 wrist:8
pocketwatch | object.tech | watch:9 clock:7
cane | object.misc | walkingstick:9 stick:7 old:5 candy:3
walkingstick | object.misc | cane:9 stick:7
pipe | object.misc | smoke:5
cigar | object.misc | smoke:7 cigarette:8
lighter | object.light | cigarette:5
matchbox | object.container | match:9 box:6
candle | object.light | birthdaycandle:5
torch | object.light | flame:5
flare | object.light | signal:7 rocket:5 emergency:6 flash:5
lantern | object.light | paperlantern:6
oillamp | object.light | lamp:9 genie:6 lantern:7
glowstick | object.light | glow:9 party:5 neon:6
fireplace | object.home | poker:4
poker | object.tool | fireplace:5
logpile | nature.plant.part | firewood:9 log:9
matchstick | object.light | match:9
newspaper | object.paper | headline:6
book | object.paper | bookmark:7
bookmark | object.paper | book:8 page:7 ribbon:4
paperback | object.paper | book:9 novel:7
hardback | object.paper | book:9
library | place.building.public | librarian:7
map | object.nav | compassrose:5
globe | object.nav | spin:4
poster | object.paper | wall:6 picture:6 movie:5 sign:5
postcard | object.paper | souvenir:6
photo | activity.art | photograph:9
frame | object.decoration | picture:7 photo:6 painting:6 mirror:4 window:4
album | object.paper | scrapbook:6
diary | object.paper | lock:4
journal | object.paper | diary:9 notebook:8
letter | object.paper | penpal:6
penpal | person.family | letter:8 friend:6
greetingcard | object.paper | card:9 birthday:7
birthdaycard | object.paper | card:9 birthday:9
calendar | object.paper | appointment:6
appointment | activity.study | meeting:7 doctor:5 dentist:5 calendar:6
alarm | object.tech | snooze:6
rope | object.tool | knot:6
knot | object.tool | rope:8 tie:7 shoelace:6 sailor:5
string | object.tool | yoyo:5
chain | object.tool | link:7
hook | object.tool | coat:4
nail | object.tool | wood:5
bolt | object.tool | door:4
hinge | object.home | door:8 gate:6
handle | object.home | door:6 cup:5 knob:7
knob | object.home | doorknob:9 handle:7 radio:4
switch | object.tech | toggle:7
toggle | object.tech | switch:7 button:6
button | object.tech | click:6
click | action.daily | mouse:7 button:6 camera:4
battery | object.tech | power:6
magnifyingglass | object.tech | magnifier:9 lens:8 detective:8
flashlight | object.light | torch:8
binoculars | object.nav | opera:3
periscope | object.nav | submarine:9 mirror:6 telescope:6
compass | object.nav | northstar:5
northstar | sky.body | star:8 north:8 compass:6 navigate:6
pole | object.misc | northpole:5
ladder | object.tool | firefighter:5
bucket | object.container | spade:5
shovel | object.tool | snow:3
umbrella | object.clothing.wear | rainy:5
sunhat | object.clothing.head | hat:9 sun:7 beach:6
beachball | object.toy | ball:8 beach:8 summer:5
beachtowel | object.misc | towel:9 beach:8
deckchair | object.furniture | beach:8 chair:8 sun:5
sunlounger | object.furniture | deckchair:9 beach:7 pool:6
icecreamvan | vehicle.land | icecream:9 van:7 summer:6
lifebuoy | object.misc | lifeguard:7 ring:6 swim:6 boat:5
lifejacket | object.clothing.wear | boat:7 swim:6 float:7
snorkelmask | object.clothing.head | snorkel:9 mask:7
bucketandspade | object.toy | bucket:8 spade:8 sandcastle:8
driftwood | nature.plant.part | wood:8 beach:7 drift:6 sea:5
seaglass | nature.sea_find | glass:8 beach:7 sea:6
rockpool | nature.water.sea | crab:7 starfish:7 beach:6 tide:6
tidepool | nature.water.sea | rockpool:9 tide:7
sunbathe | activity.leisure | tan:8 beach:8 sun:8 sunscreen:6
tan | color.brown | sunbathe:6
suntan | body.part | tan:9 sun:7 beach:5
sunbeam | weather.air | sunshine:8 sunlight:8 ray:7

# ───────────── BIG EXPANSION · COMMON ABSTRACT WORDS ─────────────
life | feeling.mind | alive:8 living:8 death:7 birth:6 live:8
alive | quality.other | living:8 life:8 dead:7
living | quality.other | alive:8 life:8
live | action.daily | life:8 alive:7 home:5
death | feeling.negative | dead:8 die:9 life:7 grave:6 skull:5
die | action.daily | death:9 dead:8
birth | feeling.mind | born:9 baby:8 birthday:6 life:6
born | quality.other | birth:9 baby:6
funeral | activity.leisure | death:8 grave:7 coffin:7 sad:6 cemetery:7
cemetery | place.outdoor | graveyard:9 grave:8 funeral:7 tomb:6
room | place.room | bedroom:7 house:6 door:5 kitchen:5 space:5
place | place.urban | spot:7 location:9 area:7
location | place.urban | place:9 map:6 address:7
address | place.urban | location:7 street:6 house:5 letter:5
land | nature.land.ground | ground:8 earth:7 field:6 country:5 island:4
oil | material.other | petrol:7 fuel:6 olive:6 cook:4 slippery:5
name | activity.study | word:5 title:7 nickname:8 signature:5
nickname | activity.study | name:8
title | activity.study | name:7 book:5 crown:3
age | time.unit | old:7 birthday:6 year:6 young:5
change | action.make | swap:6 transform:8 different:6
transform | action.make | change:8 robot:4 caterpillar:4 butterfly:4
different | quality.other | change:6 unique:6 same:7 strange:4
difference | quality.other | different:8 compare:6
same | quality.other | identical:9 different:7 twin:6 equal:7
identical | quality.other | same:9 twin:7
equal | quality.other | same:7 fair:6 balance:5
group | person.family | team:7 crowd:6 gang:7 club:6 band:5
gang | person.family | group:7 crew:7
crew | person.family | team:7 ship:6 sailor:5 gang:7
community | person.family | village:6 town:6 people:7 neighbor:6
society | person.family | community:8 people:6
people | person.family | crowd:6
others | person.family | people:6
guy | person.family | man:8 boy:5 dude:8
dude | person.family | guy:8
thing | object.misc | object:9 stuff:9 item:8
object | object.misc | thing:9 item:8
item | object.misc | thing:8 object:8
stuff | object.misc | thing:9 junk:6
junk | object.misc | trash:7 stuff:6 garbage:6
part | object.misc | piece:9 bit:7
piece | object.misc | part:9 puzzle:6 slice:5
bit | object.misc | piece:7 small:5
way | place.urban | path:7 road:6 route:7 direction:6
side | quality.other | edge:6 left:5 right:5
case | object.container | box:6 suitcase:7 detective:5
system | object.tech | machine:5 computer:5 order:6
state | place.country | country:6 nation:6
service | activity.study | help:6 waiter:5
issue | activity.study | problem:8
problem | activity.study | issue:8
result | activity.study | score:6 answer:5 outcome:9
outcome | activity.study | result:9
reason | feeling.mind | why:8 because:7 cause:7
cause | feeling.mind | reason:7 effect:7
effect | feeling.mind | cause:7 result:6
why | feeling.mind | reason:8 question:6
because | feeling.mind | reason:7 why:7
education | activity.study | school:8 learn:8 teacher:7 study:6
sense | feeling.mind | feel:6 touch:5 smell:5
interest | feeling.mind | hobby:7 curious:6
experience | feeling.mind | adventure:5 memory:5
control | action.daily | remote:6 controller:7 boss:4
care | feeling.positive | caring:8 love:5 nurse:5
role | activity.art | actor:7 part:6 character:7
character | activity.art | role:7 hero:5 story:5
effort | feeling.positive | work:6 try:7
try | action.daily | attempt:9 effort:7
attempt | action.daily | try:9
rate | activity.study | speed:6 price:4
decision | feeling.mind | choose:8 decide:9
relationship | feeling.positive | friendship:7 love:6 couple:6
value | quality.other | price:7 worth:9 valuable:8
worth | quality.other | value:9 price:6
action | activity.art | movie:5 adventure:5 hero:4
position | place.urban | place:6 location:7
form | object.paper | shape:6 paper:4
event | activity.leisure | party:6 festival:6 occasion:8
occasion | activity.leisure | event:8 party:5 celebration:6
official | person.job | officer:6
matter | activity.study | problem:5 issue:5
site | place.urban | place:7 location:7 website:5
activity | activity.leisure | hobby:6 game:5 sport:5
need | feeling.mind | want:8 must:7
want | feeling.mind | wish:8 need:8 desire:8
desire | feeling.mind | want:8 wish:7
like | feeling.positive | love:7 enjoy:8 hate:6
enjoy | feeling.positive | like:8 fun:7 love:6
hate | feeling.negative | love:7 dislike:9 angry:5
dislike | feeling.negative | hate:9 like:6
situation | activity.study | problem:4 event:4
cost | object.misc | price:9 money:7 expensive:5
industry | activity.study | factory:8 business:6
figure | activity.art | shape:6 number:5 statue:5
product | object.misc | item:7 shop:5
support | action.daily | help:7 fan:5
attention | feeling.mind | focus:8 listen:6
focus | feeling.mind | attention:8 lens:5 camera:4
source | activity.study | origin:8 start:5
origin | activity.study | source:8 start:6 beginning:7
beginning | quality.other | start:9 origin:7 end:6
organization | activity.study | company:7 group:6 club:5
evidence | activity.study | clue:8 proof:9 detective:7
proof | activity.study | evidence:9 fact:6
population | person.family | people:8 city:5
short | quality.size | tall:7 small:6 long:7
long | quality.size | short:7 tall:5 far:5
know | feeling.mind | knowledge:8 understand:8 learn:6
understand | feeling.mind | know:8 learn:6
bring | action.move | carry:7 take:6 fetch:7
fetch | action.move | bring:7 dog:6 ball:5
stay | action.daily | wait:6 remain:8 home:4
remain | action.daily | stay:8
weigh | action.daily | weight:9 scale:8 heavy:6
fill | action.daily | full:8 pour:6 empty:6
bend | action.move | curve:7 stretch:6 fold:6
wilt | action.make | droop:8 flower:6 dry:5
droop | action.make | wilt:8
drip | action.daily | leak:8 water:6 tap:6 drop:7
leak | action.daily | drip:8 pipe:6 plumber:5
policy | activity.study | rule:7 law:6
development | activity.study | growth:7 build:5
growth | action.make | grow:9
`;

  // Spelling variants that map onto a single lexicon word (variant -> canonical).
  AW.LEXICON_ALIASES = {
    gray: 'grey', colour: 'color', colors: 'color', colours: 'color',
    harbour: 'harbor', theatre: 'theater', jewellery: 'jewel', jewelry: 'jewel',
    aeroplane: 'airplane', doughnut: 'donut', omelette: 'omelet', moustache: 'mustache',
    mum: 'mother', mom: 'mother', mommy: 'mother', dad: 'father', daddy: 'father',
    tv: 'television', telly: 'television', tshirt: 'shirt', teeshirt: 'shirt', flipflop: 'sandal', flipflops: 'sandal'
  };

  // Irregular plural / inflected forms (form -> base).
  AW.LEXICON_IRREGULAR = {
    mice: 'mouse', geese: 'goose', teeth: 'tooth', feet: 'foot', children: 'child', people: 'person',
    men: 'man', women: 'woman', leaves: 'leaf', knives: 'knife', wolves: 'wolf', shelves: 'shelf',
    calves: 'calf', halves: 'half', loaves: 'loaf', thieves: 'thief', lives: 'life', wives: 'wife',
    oxen: 'ox', cacti: 'cactus', fungi: 'fungus', dice: 'dice', fish: 'fish', sheep: 'sheep',
    deer: 'deer', moose: 'moose', octopi: 'octopus', octopuses: 'octopus', tomatoes: 'tomato',
    potatoes: 'potato', mangoes: 'mango', volcanoes: 'volcano', heroes: 'hero', echoes: 'echo',
    berries: 'berry', cherries: 'cherry', strawberries: 'strawberry', butterflies: 'butterfly',
    fireflies: 'firefly', ladies: 'lady', babies: 'baby', puppies: 'puppy', ponies: 'pony',
    stories: 'story', libraries: 'library', countries: 'country', cities: 'city', bodies: 'body',
    flies: 'fly', skies: 'sky', ran: 'run', swam: 'swim', flew: 'fly', ate: 'eat', drank: 'drink',
    sang: 'sing', slept: 'sleep', dreamt: 'dream', wrote: 'write', built: 'build', grew: 'grow',
    swimming: 'swimming', running: 'run', dancing: 'dance', singing: 'sing', cooking: 'cook',
    sleeping: 'sleep', flying: 'fly', diving: 'diving', fishing: 'fishing', surfing: 'surfing'
  };
})(window.AW = window.AW || {});
