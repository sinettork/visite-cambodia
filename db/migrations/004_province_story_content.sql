USE cambodia_tourism;

ALTER TABLE province_guides
  ADD COLUMN story_km TEXT NULL AFTER overview_en,
  ADD COLUMN story_en TEXT NULL AFTER story_km,
  ADD COLUMN history_km TEXT NULL AFTER story_en,
  ADD COLUMN history_en TEXT NULL AFTER history_km,
  ADD COLUMN culture_km TEXT NULL AFTER history_en,
  ADD COLUMN culture_en TEXT NULL AFTER culture_km;

INSERT INTO province_guides (
  province_id,
  overview_km, overview_en,
  attractions_km, attractions_en,
  stay_guide_km, stay_guide_en,
  food_guide_km, food_guide_en
)
SELECT
  p.id,
  CONCAT(p.name_km, ' — ស្វែងយល់ពីប្រវត្តិសាស្ត្រ វប្បធម៌ និងកន្លែងគួរទៅលេងក្នុងខេត្តនេះ។'),
  CONCAT('Explore the history, culture and places to visit in ', p.name_en, '.'),
  'ស្វែងរកកន្លែងកម្សាន្ត និងតំបន់គួរទស្សនាដែលមានបញ្ជីខាងក្រោម។',
  'Browse the attractions and places listed below.',
  'ជ្រើសរើសកន្លែងស្នាក់នៅតាមផែនការធ្វើដំណើរ និងបញ្ជាក់ព័ត៌មានមុនកក់។',
  'Choose accommodation around your route and confirm current details before booking.',
  'សាកម្ហូបក្នុងតំបន់ និងបញ្ជាក់តម្លៃមុនកុម្ម៉ង់។',
  'Try local food and confirm prices before ordering.'
FROM provinces p
WHERE p.slug IN ('siem-reap','phnom-penh','kampot','kep','preah-sihanouk','ratanakiri')
  AND NOT EXISTS (
    SELECT 1 FROM province_guides g WHERE g.province_id = p.id
  );

UPDATE province_guides g
JOIN provinces p ON p.id = g.province_id
SET
  g.story_km = CASE p.slug
    WHEN 'banteay-meanchey' THEN 'បន្ទាយមានជ័យមានអត្តសញ្ញាណជាខេត្តព្រំដែនភាគពាយ័ព្យ ដែលភ្ជាប់ចលនាពាណិជ្ជកម្ម ទេសភាពជនបទ និងបេតិកភណ្ឌខ្មែរ។ សម្រាប់អ្នកធ្វើដំណើរ ខេត្តនេះផ្តល់ទាំងដំណើរទស្សនាប្រាសាទ និងបទពិសោធន៍ទីក្រុងព្រំដែន។'
    WHEN 'battambang' THEN 'បាត់ដំបងមានចរិតលេចធ្លោពីក្រុងចាស់តាមដងស្ទឹងសង្កែ ស្ថាបត្យកម្ម និងសិល្បៈក្នុងស្រុក។ ជុំវិញក្រុងមានវាលស្រែ ប្រាសាទ និងភ្នំ ដែលធ្វើឱ្យការធ្វើដំណើរអាចភ្ជាប់ទីក្រុងជាមួយជនបទបានយ៉ាងងាយ។'
    WHEN 'kampong-cham' THEN 'កំពង់ចាមជាខេត្តតាមដងទន្លេមេគង្គ ដែលជីវិតមូលដ្ឋានភ្ជាប់ជាមួយទឹក កសិកម្ម និងសហគមន៍តាមកោះ។ ក្រុងមានបរិយាកាសស្ងប់ស្ងាត់សម្រាប់ដើរមាត់ទន្លេ ហើយតំបន់ជុំវិញស័ក្តិសមសម្រាប់ដំណើរថ្ងៃ។'
    WHEN 'kampong-chhnang' THEN 'កំពង់ឆ្នាំងមានភាពលេចធ្លោដោយសិប្បកម្មឆ្នាំងដី ទេសភាពទឹក និងភូមិជនបទនៅជាប់បឹងទន្លេសាប។ វាជាគោលដៅសម្រាប់អ្នកចង់ស្គាល់ជីវភាព និងសិប្បកម្មប្រចាំតំបន់ក្រៅពីទីក្រុងធំៗ។'
    WHEN 'kampong-speu' THEN 'កំពង់ស្ពឺជាច្រកទៅតំបន់ភ្នំក្រវាញ និងភ្នំឱរ៉ាល់ ជាមួយជនបទ និងកសិកម្មដែលនៅតែមានតួនាទីសំខាន់។ ការធ្វើដំណើរនៅទីនេះសមស្របសម្រាប់អ្នកចង់បន្ថយល្បឿន និងស្វែងរកធម្មជាតិ។'
    WHEN 'kampong-thom' THEN 'កំពង់ធំស្ថិតនៅកណ្ដាលប្រទេស និងជាចំណុចភ្ជាប់ដ៏ងាយស្រួលសម្រាប់ដំណើរទៅតំបន់បេតិកភណ្ឌបុរាណ។ បរិយាកាសជនបទ វាលស្រែ និងប្រាសាទបុរាណផ្តល់អារម្មណ៍ធ្វើដំណើរដែលផ្តោតលើប្រវត្តិសាស្ត្រ។'
    WHEN 'kandal' THEN 'កណ្ដាលព័ទ្ធជុំវិញរាជធានីភ្នំពេញ និងមានសហគមន៍តាមដងទន្លេ កោះ និងតំបន់កសិកម្ម។ វាសមស្របសម្រាប់ដំណើរខ្លីចេញពីភ្នំពេញ និងការស្គាល់ជីវិតមូលដ្ឋានជិតរាជធានី។'
    WHEN 'koh-kong' THEN 'កោះកុងមានការរួមបញ្ចូលរវាងឆ្នេរ ព្រៃកោងកាង ទន្លេ និងភ្នំក្រវាញ។ ចំណុចសំខាន់របស់វាគឺទេសភាពធម្មជាតិទូលំទូលាយ និងបទពិសោធន៍ធ្វើដំណើរដែលត្រូវរៀបចំទុកជាមុន។'
    WHEN 'kratie' THEN 'ក្រចេះមានបរិយាកាសក្រុងស្ងប់ស្ងាត់តាមមេគង្គ និងជីវិតដែលភ្ជាប់ជាមួយទន្លេ។ វាល្បីជាពិសេសសម្រាប់ដំណើរមើលផ្សោតទឹកសាប និងការជិះកង់ស្វែងយល់តំបន់កោះ។'
    WHEN 'mondulkiri' THEN 'មណ្ឌលគិរីមានអាកាសធាតុខ្ពស់ត្រជាក់ ព្រៃធំ និងទឹកធ្លាក់ជាច្រើន។ ខេត្តនេះក៏ជាតំបន់ដែលអ្នកធ្វើដំណើរអាចស្គាល់សហគមន៍ជនជាតិដើម និងបរិស្ថានធម្មជាតិជិតស្និទ្ធ។'
    WHEN 'preah-vihear' THEN 'ព្រះវិហារភ្ជាប់រវាងទេសភាពភ្នំ និងបេតិកភណ្ឌប្រាសាទខ្មែរដ៏សំខាន់។ គោលដៅនៅទីនេះមានអារម្មណ៍ដាច់ស្រយាលជាងខេត្តទេសចរណ៍ធំៗ និងសមស្របសម្រាប់អ្នកស្រឡាញ់ប្រវត្តិសាស្ត្រ។'
    WHEN 'prey-veng' THEN 'ព្រៃវែងជាខេត្តវាលទំនាបដែលជីវិតប្រចាំថ្ងៃភ្ជាប់ជាមួយកសិកម្ម សហគមន៍ និងបណ្តាញទន្លេ។ ការធ្វើដំណើរទៅទីនេះផ្តោតលើការស្គាល់ជីវិតមូលដ្ឋាន និងតំបន់ជនបទ។'
    WHEN 'pursat' THEN 'ពោធិ៍សាត់ស្ថិតចន្លោះបឹងទន្លេសាប និងជួរភ្នំក្រវាញ ដូច្នេះមានទេសភាពចម្រុះពីវាលទំនាបទៅតំបន់ភ្នំ។ វាជាគោលដៅដែលអាចភ្ជាប់ដំណើរទៅធម្មជាតិ និងសហគមន៍ជនបទបាន។'
    WHEN 'ratanakiri' THEN 'រតនគិរីមានទេសភាពខុសប្លែកពីតំបន់ជាច្រើននៃកម្ពុជា ដោយមានដីក្រហម ព្រៃ និងបឹងភ្នំភ្លើង។ បានលុងជាមូលដ្ឋានសម្រាប់ចេញទៅទឹកធ្លាក់ បឹង និងសហគមន៍ជុំវិញ។'
    WHEN 'siem-reap' THEN 'សៀមរាបគឺជាចំណុចចាប់ផ្តើមសំខាន់សម្រាប់ស្វែងយល់អង្គរ និងសិល្បៈខ្មែរ។ លើសពីប្រាសាទ ក្រុងមានទីផ្សារ អាហារ សិល្បៈ និងសហគមន៍ជុំវិញបឹងទន្លេសាបដែលធ្វើឱ្យដំណើរមានភាពចម្រុះ។'
    WHEN 'phnom-penh' THEN 'ភ្នំពេញជារាជធានីដែលបង្ហាញការជួបគ្នារវាងប្រវត្តិសាស្ត្រ ជីវិតសម័យទំនើប និងវប្បធម៌ទីក្រុង។ ព្រះបរមរាជវាំង សារមន្ទីរ ផ្សារ និងមាត់ទន្លេធ្វើឱ្យទីក្រុងមានអ្វីសម្រាប់ស្វែងយល់ជាច្រើន។'
    WHEN 'kampot' THEN 'កំពតមានចរិតស្ងប់ស្ងាត់តាមមាត់ទន្លេ និងល្បីដោយម្រេច ភ្នំ និងអគារចាស់ៗក្នុងក្រុង។ វាជាគោលដៅដែលអាចបញ្ចូលអាហារ ធម្មជាតិ និងដំណើរទៅបូកគោក្នុងការធ្វើដំណើរតែមួយ។'
    WHEN 'kep' THEN 'កែបជាខេត្តមាត់សមុទ្រតូចដែលមានបរិយាកាសស្ងប់ស្ងាត់ កោះ និងម្ហូបសមុទ្រ។ ភ្ញៀវអាចបញ្ចូលការដើរតាមឆ្នេរ ទស្សនាឧទ្យានជាតិ និងសាកក្តាមជាមួយម្រេចកំពត។'
    WHEN 'preah-sihanouk' THEN 'ព្រះសីហនុជាច្រកទៅកាន់ឆ្នេរ និងកោះជាច្រើននៅភាគនិរតីកម្ពុជា។ ដំណើរមានចាប់ពីឆ្នេរក្នុងក្រុងរហូតដល់បទពិសោធន៍កោះ ដែលត្រូវយកចិត្តទុកដាក់លើអាកាសធាតុ និងកាលវិភាគទូក។'
    WHEN 'stung-treng' THEN 'ស្ទឹងត្រែងមានអត្តសញ្ញាណជាខេត្តមេគង្គខាងជើង ដែលមានទន្លេបែកច្រើន ខ្សាច់ កោះ និងតំបន់សើម។ វាសមស្របសម្រាប់អ្នកចង់ឃើញទេសភាពទន្លេ និងធម្មជាតិដែលមិនសូវមមាញឹក។'
    WHEN 'svay-rieng' THEN 'ស្វាយរៀងជាខេត្តភាគកើតដែលមានផ្លូវពាណិជ្ជកម្ម និងជីវភាពកសិកម្មជិតព្រំដែន។ ការធ្វើដំណើរនៅទីនេះផ្តោតលើជីវិតទីប្រជុំជន ម្ហូបមូលដ្ឋាន និងបរិយាកាសផ្លូវឆ្លងកាត់។'
    WHEN 'takeo' THEN 'តាកែវមានស្រទាប់ប្រវត្តិសាស្ត្រយូរអង្វែង និងតំបន់បុរាណជាច្រើននៅជិតភ្នំពេញ។ ភ្នំជីសូរ ភ្នំដា និងអង្គរបុរីធ្វើឱ្យខេត្តនេះសមស្របសម្រាប់អ្នកចង់ស្វែងយល់ដើមកំណើតអរិយធម៌ខ្មែរ។'
    WHEN 'oddar-meanchey' THEN 'ឧត្តរមានជ័យជាខេត្តព្រំដែនភាគពាយ័ព្យដែលមានតំបន់ជនបទ និងបេតិកភណ្ឌប្រាសាទ។ ទេសភាពស្ងប់ស្ងាត់ និងការធ្វើដំណើរទៅតំបន់ឆ្ងាយផ្តល់អារម្មណ៍ផ្សងព្រេងជាងគោលដៅទេសចរណ៍ធំៗ។'
    WHEN 'pailin' THEN 'ប៉ៃលិនជាខេត្តតូចតាមជើងភ្នំជាប់ព្រំដែនថៃ ដែលមានប្រវត្តិពាក់ព័ន្ធនឹងត្បូង និងជីវភាពកសិកម្ម។ ភ្នំ ធម្មជាតិ និងទីក្រុងតូចធ្វើឱ្យវាមានបរិយាកាសស្ងប់ស្ងាត់ និងខុសពីកន្លែងទេសចរណ៍ធំៗ។'
    WHEN 'tboung-khmum' THEN 'ត្បូងឃ្មុំមានទេសភាពកសិកម្ម ចម្ការកៅស៊ូ និងជីវិតជាប់មេគង្គ។ ខេត្តនេះសមស្របសម្រាប់ការធ្វើដំណើរដែលចង់ឃើញទិដ្ឋភាពជនបទ សិប្បកម្ម និងសហគមន៍មូលដ្ឋាន។'
    ELSE g.overview_km
  END,
  g.story_en = CASE p.slug
    WHEN 'banteay-meanchey' THEN 'Banteay Meanchey is a northwestern border province shaped by trade, rural landscapes and Khmer heritage. It works well for travellers who want to combine temple visits with the atmosphere of a Cambodian border region.'
    WHEN 'battambang' THEN 'Battambang stands out for its riverside old town, architecture and strong local arts scene. Beyond the city, rice fields, temples and limestone hills make it easy to combine culture with countryside.'
    WHEN 'kampong-cham' THEN 'Kampong Cham follows the Mekong, with river communities, islands and a relaxed provincial capital. It is a good choice for a slower trip built around the river, local life and short excursions.'
    WHEN 'kampong-chhnang' THEN 'Kampong Chhnang is known for pottery, waterways and rural communities around the Tonle Sap. The province is especially rewarding for travellers interested in everyday life and local craft traditions.'
    WHEN 'kampong-speu' THEN 'Kampong Speu is a gateway toward the Cardamom foothills and Phnom Aural, with a landscape shaped by farming and forest. It suits travellers looking for nature and a quieter pace outside the capital.'
    WHEN 'kampong-thom' THEN 'Kampong Thom sits near the centre of Cambodia and provides an easy route toward important ancient heritage sites. Its rural landscape and temple areas give the province a distinctly history-focused travel experience.'
    WHEN 'kandal' THEN 'Kandal surrounds Phnom Penh and combines river communities, islands and farming areas. It is well suited to short trips from the capital and to travellers who want a closer look at everyday life beyond the city.'
    WHEN 'koh-kong' THEN 'Koh Kong brings together coast, mangroves, rivers and the Cardamom Mountains. Its appeal is the scale of its natural landscapes and the more planned, slower style of travel needed for remote areas.'
    WHEN 'kratie' THEN 'Kratie is a relaxed Mekong town where local life follows the river. It is especially known as a base for freshwater dolphin trips and for exploring the countryside and islands by bike.'
    WHEN 'mondulkiri' THEN 'Mondulkiri has a cool highland climate, broad forests and waterfalls. It also offers opportunities to learn about Indigenous communities and the relationship between local livelihoods and the natural environment.'
    WHEN 'preah-vihear' THEN 'Preah Vihear connects mountain landscapes with important Khmer temple heritage. The province feels more remote than Cambodia’s main tourist centres and suits travellers drawn to archaeology and quieter roads.'
    WHEN 'prey-veng' THEN 'Prey Veng is a lowland province shaped by farming, communities and waterways. Travel here is more about seeing local life, markets and rural landscapes than following a major tourist circuit.'
    WHEN 'pursat' THEN 'Pursat sits between Tonle Sap and the Cardamom Mountains, giving it a varied landscape from lowlands to uplands. It is a useful base for combining nature, rural communities and overland travel.'
    WHEN 'ratanakiri' THEN 'Ratanakiri feels different from much of Cambodia, with red earth, forests and volcanic landscapes. Banlung provides a practical base for trips to lakes, waterfalls and nearby Indigenous communities.'
    WHEN 'siem-reap' THEN 'Siem Reap is the main gateway to Angkor and a strong base for experiencing Khmer art and culture. Beyond the temples, the city offers markets, food, arts and access to communities around Tonle Sap.'
    WHEN 'phnom-penh' THEN 'Phnom Penh brings together royal heritage, museums, markets, riverside life and a modern Cambodian city. The result is a destination where historical places and everyday urban culture sit close together.'
    WHEN 'kampot' THEN 'Kampot is known for its calm riverside atmosphere, pepper, hills and historic townscape. A single trip can combine food, countryside, nature and a journey into Bokor National Park.'
    WHEN 'kep' THEN 'Kep is a small coastal province with a quiet atmosphere, islands and a strong seafood culture. Visitors can combine beach walks, national-park trails and the famous crab market with Kampot pepper.'
    WHEN 'preah-sihanouk' THEN 'Preah Sihanouk is the main gateway to Cambodia’s southwestern coast and islands. Travel ranges from town beaches to island stays, with weather and boat schedules playing an important role.'
    WHEN 'stung-treng' THEN 'Stung Treng is a northern Mekong province of channels, islands, sandbanks and wetlands. It suits travellers who want river landscapes and nature away from Cambodia’s busiest tourist routes.'
    WHEN 'svay-rieng' THEN 'Svay Rieng is an eastern border province shaped by agriculture and cross-border movement. Travel here is centred on small towns, local food and the everyday rhythm of a province along an important route.'
    WHEN 'takeo' THEN 'Takeo has a deep archaeological story and several ancient sites within easy reach of Phnom Penh. Phnom Chisor, Phnom Da and Angkor Borei make it a strong destination for travellers interested in early Khmer history.'
    WHEN 'oddar-meanchey' THEN 'Oddar Meanchey is a northwestern border province of rural landscapes and temple heritage. Quieter roads and more remote sites give the province a more exploratory feel than Cambodia’s established tourist centres.'
    WHEN 'pailin' THEN 'Pailin is a small hill province on the Thai border with a history tied to gemstones and farming. Its hills, waterfalls and compact town give it a quieter character than larger tourist destinations.'
    WHEN 'tboung-khmum' THEN 'Tboung Khmum combines agricultural landscapes, rubber plantations and Mekong communities. It is suited to travellers interested in rural scenery, local craft and everyday provincial life.'
    ELSE g.overview_en
  END,
  g.history_km = CASE p.slug
    WHEN 'banteay-meanchey' THEN 'តំបន់នេះមានសំណល់បេតិកភណ្ឌខ្មែរច្រើននៅតាមតំបន់ព្រំដែន និងជុំវិញបន្ទាយឆ្មារ។ ប្រវត្តិសាស្ត្រខេត្តក៏ភ្ជាប់ជាមួយផ្លូវធ្វើដំណើរ និងពាណិជ្ជកម្មឆ្លងព្រំដែនរយៈពេលយូរ។'
    WHEN 'battambang' THEN 'បាត់ដំបងមានស្រទាប់ប្រវត្តិសាស្ត្រទាំងសម័យខ្មែរ និងអាណានិគម ដែលនៅសល់តាមប្រាសាទ និងអគារចាស់ក្នុងក្រុង។ តំបន់ជុំវិញក៏មានទីតាំងប្រវត្តិសាស្ត្រជាច្រើន។'
    WHEN 'kampong-cham' THEN 'ជីវិតតាមមេគង្គបានធ្វើឱ្យកំពង់ចាមក្លាយជាតំបន់សំខាន់សម្រាប់ការធ្វើដំណើរ និងពាណិជ្ជកម្ម។ វត្តនគរបាជ័យ និងទីតាំងបុរាណជុំវិញបង្ហាញស្រទាប់ប្រវត្តិសាស្ត្រដ៏យូរ។'
    WHEN 'kampong-chhnang' THEN 'ប្រវត្តិសាស្ត្រខេត្តភ្ជាប់ជាមួយបឹងទន្លេសាប ផ្លូវទឹក និងសហគមន៍ផលិតឆ្នាំងដី។ ភូមិបុរាណ និងសំណង់សាសនាជាច្រើនជួយបង្ហាញការរីកចម្រើនរបស់សហគមន៍តាមទឹក។'
    WHEN 'kampong-speu' THEN 'ប្រវត្តិសាស្ត្ររបស់កំពង់ស្ពឺភ្ជាប់ជាមួយតំបន់ភ្នំក្រវាញ និងសហគមន៍កសិកម្មតាមជើងភ្នំ។ តំបន់បុរាណ និងផ្លូវធម្មជាតិនៅជុំវិញភ្នំបង្ហាញការរស់នៅជាមួយបរិស្ថានយូរមកហើយ។'
    WHEN 'kampong-thom' THEN 'សំបូរព្រៃគុកជាស្នូលប្រវត្តិសាស្ត្រសំខាន់របស់ខេត្ត និងជាសំណង់ដែលបង្ហាញអរិយធម៌មុនសម័យអង្គរ។ តំបន់ជុំវិញក៏មានប្រាសាទ និងទីតាំងសាសនាបុរាណជាច្រើន។'
    WHEN 'kandal' THEN 'កណ្ដាលមានតួនាទីជាតំបន់ជុំវិញរាជធានី និងជាតំបន់មានទីតាំងរាជធានីបុរាណដូចឧដុង្គ។ ប្រវត្តិសាស្ត្រត្រូវបានភ្ជាប់ជាមួយព្រះរាជវាំង សាសនា និងសហគមន៍តាមទន្លេ។'
    WHEN 'koh-kong' THEN 'កោះកុងមានប្រវត្តិសាស្ត្រជាតំបន់ព្រំដែន និងផ្លូវពាណិជ្ជកម្មតាមសមុទ្រ និងព្រៃភ្នំ។ ការអភិរក្សធម្មជាតិជំនាន់ថ្មីក៏ក្លាយជាផ្នែកសំខាន់នៃរឿងរ៉ាវរបស់ខេត្ត។'
    WHEN 'kratie' THEN 'ក្រចេះមានប្រវត្តិសាស្ត្រតភ្ជាប់ជាមួយពាណិជ្ជកម្មតាមមេគង្គ និងទីប្រជុំជនតូចៗតាមទន្លេ។ សំណង់សាសនា និងទីក្រុងចាស់បន្សល់ទុកស្រទាប់អតីតកាលនៅក្បែរមាត់ទន្លេ។'
    WHEN 'mondulkiri' THEN 'រឿងរ៉ាវប្រវត្តិសាស្ត្រមណ្ឌលគិរីភ្ជាប់ជិតស្និទ្ធជាមួយសហគមន៍ជនជាតិដើម និងការរស់នៅតាមព្រៃភ្នំ។ អត្តសញ្ញាណនេះនៅតែជាផ្នែកសំខាន់នៃបទពិសោធន៍អ្នកទេសចរ។'
    WHEN 'preah-vihear' THEN 'ប្រាសាទព្រះវិហារ និងតំបន់កោះកេរបង្ហាញតួនាទីសំខាន់របស់ដែនខ្ពស់ភាគជើងក្នុងប្រវត្តិសាស្ត្រខ្មែរ។ ទីតាំងទាំងនេះជាផ្នែកនៃបេតិកភណ្ឌដែលត្រូវការការអភិរក្ស និងការគោរពនៅពេលទស្សនា។'
    WHEN 'prey-veng' THEN 'ប្រវត្តិសាស្ត្រព្រៃវែងភ្ជាប់ជាមួយសហគមន៍កសិកម្ម និងផ្លូវទឹកនៃតំបន់វាលទំនាប។ ប្រាសាទ និងវត្តអារាមមូលដ្ឋានជួយបង្ហាញបន្តនៃប្រវត្តិសាស្ត្រខ្មែរតាមជនបទ។'
    WHEN 'pursat' THEN 'ពោធិ៍សាត់ស្ថិតតាមផ្លូវភ្ជាប់ពីបឹងទន្លេសាបទៅភ្នំក្រវាញ ដែលមានសារៈសំខាន់សម្រាប់ការធ្វើដំណើរ និងការរស់នៅតាមទន្លេ។ ប្រវត្តិសាស្ត្រមូលដ្ឋានត្រូវបានរក្សាទុកតាមវត្ត ទីប្រជុំជន និងសហគមន៍ជនបទ។'
    WHEN 'ratanakiri' THEN 'រតនគិរីមានរឿងរ៉ាវប្រវត្តិសាស្ត្រដែលខុសពីតំបន់កណ្ដាលប្រទេស ដោយមានទំនាក់ទំនងជ្រៅជាមួយសហគមន៍ជនជាតិដើម និងព្រៃភ្នំ។ ទីក្រុងបានលុងកើនតួនាទីជាមជ្ឈមណ្ឌលរបស់ខេត្តក្នុងសម័យទំនើប។'
    WHEN 'siem-reap' THEN 'សៀមរាបជាបេះដូងនៃតំបន់អង្គរ ដែលជាមជ្ឈមណ្ឌលនយោបាយ និងសាសនាសំខាន់របស់អាណាចក្រខ្មែរបុរាណ។ សំណង់ប្រាសាទ និងអាងទឹកជុំវិញបានបន្សល់រឿងរ៉ាវអំពីស្ថាបត្យកម្ម និងការរៀបចំទីក្រុងបុរាណ។'
    WHEN 'phnom-penh' THEN 'ភ្នំពេញបានរីកចម្រើនជារាជធានីទំនើបនៅតាមចំណុចប្រសព្វទន្លេមេគង្គ បាសាក់ និងទន្លេសាប។ ព្រះបរមរាជវាំង សារមន្ទីរ និងអគារប្រវត្តិសាស្ត្រផ្តល់ស្រទាប់រឿងរ៉ាវពីរាជវាំងរហូតដល់ទីក្រុងសម័យទំនើប។'
    WHEN 'kampot' THEN 'កំពតមានប្រវត្តិជាទីក្រុងពាណិជ្ជកម្មតាមមាត់ទន្លេ ហើយនៅសល់អគារចាស់ជាច្រើននៅកណ្ដាលក្រុង។ ប្រវត្តិសាស្ត្របូកគោ និងសេដ្ឋកិច្ចកសិកម្មក៏ជាផ្នែកមួយនៃអត្តសញ្ញាណខេត្ត។'
    WHEN 'kep' THEN 'កែបមានប្រវត្តិជារមណីយដ្ឋានឆ្នេរសមុទ្រសម្រាប់អ្នករស់នៅទីក្រុង និងបានឆ្លងកាត់ការប្រែប្រួលជាច្រើនក្នុងសតវត្សទី២០។ សំណល់វីឡា ផ្លូវឆ្នេរ និងទីផ្សារសមុទ្របង្ហាញអតីតកាលរបស់ក្រុង។'
    WHEN 'preah-sihanouk' THEN 'តំបន់នេះបានរីកចម្រើនជាមជ្ឈមណ្ឌលឆ្នេរ និងកំពង់ផែសំខាន់របស់កម្ពុជា។ ការអភិវឌ្ឍក្រុង ឆ្នេរ និងកោះបានផ្លាស់ប្តូរអត្តសញ្ញាណតំបន់យ៉ាងឆាប់រហ័សនៅសម័យទំនើប។'
    WHEN 'stung-treng' THEN 'ស្ទឹងត្រែងមានប្រវត្តិសាស្ត្រភ្ជាប់ជាមួយបណ្តាញទន្លេមេគង្គ និងសហគមន៍ដែលធ្វើជីវភាពតាមទឹក។ តំបន់សើម និងកោះទន្លេនៅតែជាផ្នែកសំខាន់នៃទេសភាពប្រវត្តិសាស្ត្ររបស់ខេត្ត។'
    WHEN 'svay-rieng' THEN 'ស្វាយរៀងត្រូវបានបង្កើតជីវិតជុំវិញសហគមន៍កសិកម្ម និងផ្លូវទៅព្រំដែនភាគកើត។ ទីប្រជុំជន និងវត្តអារាមមូលដ្ឋាននៅតែជាភស្តុតាងនៃការរស់នៅតាមផ្លូវពាណិជ្ជកម្ម។'
    WHEN 'takeo' THEN 'តាកែវមានតួនាទីសំខាន់ក្នុងប្រវត្តិសាស្ត្របុរាណខ្មែរ ដោយមានអង្គរបុរី និងភ្នំដាជាទីតាំងសំខាន់ៗសម្រាប់សិក្សាអរិយធម៌ដើម។ ភ្នំជីសូរបន្ថែមស្រទាប់ប្រវត្តិសាស្ត្រសម័យក្រោយមកទៀត។'
    WHEN 'oddar-meanchey' THEN 'តំបន់ឧត្តរមានជ័យមានសំណល់ប្រាសាទ និងសហគមន៍ជាប់តំបន់ដងរែក ដែលជាប់ទាក់ទងនឹងប្រវត្តិសាស្ត្រតំបន់ព្រំដែន។ ប្រវត្តិសាស្ត្រសម័យទំនើបរបស់តំបន់ក៏ស្មុគស្មាញ និងទាមទារការរៀបរាប់ដោយប្រុងប្រយ័ត្ន។'
    WHEN 'pailin' THEN 'ប៉ៃលិនមានប្រវត្តិពាក់ព័ន្ធនឹងរ៉ែត្បូង និងការធ្វើកសិកម្មនៅតំបន់ជើងភ្នំ។ អត្តសញ្ញាណទីក្រុង និងសហគមន៍ត្រូវបានបង្កើតឡើងជុំវិញសកម្មភាពទាំងនេះ និងទំនាក់ទំនងជាមួយព្រំដែនថៃ។'
    WHEN 'tboung-khmum' THEN 'ត្បូងឃ្មុំមានការរីកចម្រើនជាមួយកសិកម្ម និងចម្ការកៅស៊ូ ហើយសហគមន៍ជាប់មេគង្គមានប្រវត្តិរស់នៅតាមទឹកយូរមកហើយ។ កន្លែងសាសនា និងសហគមន៍មូលដ្ឋានបន្តរក្សាផ្នែកមួយនៃរឿងរ៉ាវតំបន់។'
    ELSE g.overview_km
  END,
  g.history_en = CASE p.slug
    WHEN 'banteay-meanchey' THEN 'The area preserves Khmer heritage across the northwest and around Banteay Chhmar. Its history is also closely tied to long-running trade and movement across the border.'
    WHEN 'battambang' THEN 'Battambang has layers of Khmer and colonial-era history visible in temples and old-town buildings. Historic sites outside the city add another layer to the provincial story.'
    WHEN 'kampong-cham' THEN 'Life along the Mekong made Kampong Cham an important place for travel and trade. Wat Nokor Bachey and surrounding heritage sites reveal a long historical timeline.'
    WHEN 'kampong-chhnang' THEN 'The province’s history is closely connected to Tonle Sap, waterways and pottery communities. Older villages and religious sites show how settlements developed around water and craft.'
    WHEN 'kampong-speu' THEN 'Kampong Speu’s history is tied to the Cardamom foothills and farming communities. Rural settlements and mountain routes show a long relationship between people and the landscape.'
    WHEN 'kampong-thom' THEN 'Sambor Prei Kuk is the province’s defining historical site and an important window into the pre-Angkorian Khmer world. The wider area also contains smaller ancient religious sites.'
    WHEN 'kandal' THEN 'Kandal has long functioned as the landscape around the capital and includes the former royal centre of Oudong. Its history connects royal traditions, religion and river communities.'
    WHEN 'koh-kong' THEN 'Koh Kong has a borderland history shaped by coastal trade, rivers and mountain routes. In more recent decades, conservation and sustainable nature travel have become important parts of its story.'
    WHEN 'kratie' THEN 'Kratie developed through Mekong trade and small river settlements. Historic pagodas and old-town buildings preserve part of that riverside past.'
    WHEN 'mondulkiri' THEN 'Mondulkiri’s history is closely connected to Indigenous communities and forest livelihoods. This cultural identity remains an important part of how the province is understood and visited.'
    WHEN 'preah-vihear' THEN 'Preah Vihear’s mountain belt contains major Khmer heritage sites, including Preah Vihear temple and the Koh Ker archaeological area. These sites are important heritage places and should be visited with care.'
    WHEN 'prey-veng' THEN 'Prey Veng developed through farming communities and the waterways of the lowlands. Local pagodas and smaller heritage places continue the historical story through everyday rural life.'
    WHEN 'pursat' THEN 'Pursat sits on a historic route between Tonle Sap and the Cardamoms, important for movement and river life. Towns, pagodas and rural communities retain parts of that local history.'
    WHEN 'ratanakiri' THEN 'Ratanakiri’s history differs from the central plain, with deep connections to Indigenous communities and forest landscapes. Banlung became the modern provincial centre as the region developed.'
    WHEN 'siem-reap' THEN 'Siem Reap is at the heart of Angkor, a major political and religious centre of the ancient Khmer world. Temples, reservoirs and urban remains preserve the story of Khmer architecture and settlement.'
    WHEN 'phnom-penh' THEN 'Phnom Penh grew as a capital at the meeting point of the Mekong, Bassac and Tonle Sap. The Royal Palace, museums and historic buildings reveal layers of royal, colonial and modern city history.'
    WHEN 'kampot' THEN 'Kampot developed as a river trading town and still retains historic buildings in its centre. Bokor and the province’s agricultural economy add further layers to its modern identity.'
    WHEN 'kep' THEN 'Kep became a coastal resort town and changed significantly during the twentieth century. Older villas, the seafront and the crab market preserve different parts of that coastal history.'
    WHEN 'preah-sihanouk' THEN 'The province developed as Cambodia’s major coastal and port centre. Rapid growth around the city, beaches and islands has reshaped its modern identity.'
    WHEN 'stung-treng' THEN 'Stung Treng has long been shaped by the Mekong river network and communities living from the water. Wetlands and river islands remain central to the province’s landscape and history.'
    WHEN 'svay-rieng' THEN 'Svay Rieng developed around farming communities and routes toward the eastern border. Towns and pagodas preserve traces of life along these regional travel and trade routes.'
    WHEN 'takeo' THEN 'Takeo contains some of the most important archaeological places for understanding early Khmer history, including Angkor Borei and Phnom Da. Phnom Chisor adds another later historical layer.'
    WHEN 'oddar-meanchey' THEN 'Oddar Meanchey contains temple remains and communities along the Dangrek borderland. Its modern history is complex and is best presented carefully and with attention to local and historical sources.'
    WHEN 'pailin' THEN 'Pailin has a history strongly associated with gemstones and farming in the foothills. The town and its communities developed around these activities and its connection to the Thai border.'
    WHEN 'tboung-khmum' THEN 'Tboung Khmum grew through agriculture and rubber plantations, while Mekong communities maintained long-standing riverside livelihoods. Pagodas and local communities continue to carry parts of that regional story.'
    ELSE g.overview_en
  END,
  g.culture_km = CASE p.slug
    WHEN 'banteay-meanchey' THEN 'វប្បធម៌មូលដ្ឋានមានទំនាក់ទំនងជាមួយជីវិតទីផ្សារ កសិកម្ម និងសហគមន៍ជាប់ព្រំដែន។ ការស្គាល់ម្ហូបក្នុងតំបន់ និងទៅលេងទីផ្សារមូលដ្ឋានអាចជួយឱ្យយល់ពីជីវិតប្រចាំថ្ងៃបានកាន់តែល្អ។'
    WHEN 'battambang' THEN 'សិល្បៈ របាំ និងអាហារខ្មែរមូលដ្ឋានជាផ្នែកសំខាន់នៃអត្តសញ្ញាណបាត់ដំបង។ ទីផ្សារ ហាងអាហារ និងសហគមន៍ជនបទផ្តល់ឱកាសស្គាល់ជីវិតក្រៅតំបន់ទេសចរណ៍សំខាន់ៗ។'
    WHEN 'kampong-cham' THEN 'ជីវិតតាមទន្លេជះឥទ្ធិពលលើម្ហូប ការធ្វើពាណិជ្ជកម្ម និងទម្លាប់រស់នៅ។ ដំណើរតាមកោះ និងមាត់ទន្លេជួយឱ្យអ្នកទេសចរឃើញចង្វាក់ជីវិតមូលដ្ឋាន។'
    WHEN 'kampong-chhnang' THEN 'សិប្បកម្មឆ្នាំងដី និងម្ហូបត្រីទឹកសាបជាផ្នែកមួយនៃអត្តសញ្ញាណខេត្ត។ ការគោរពសហគមន៍ និងការទិញផលិតផលពីអ្នកផលិតផ្ទាល់ជាវិធីល្អក្នុងការគាំទ្រជីវិតមូលដ្ឋាន។'
    WHEN 'kampong-speu' THEN 'វប្បធម៌ជនបទផ្តោតលើកសិកម្ម ផលិតផលត្នោត និងជីវិតតាមសហគមន៍។ ម្ហូបក្នុងស្រុក និងផលិតផលកសិកម្មអាចជាផ្នែកល្អសម្រាប់សាកល្បងក្នុងដំណើរ។'
    WHEN 'kampong-thom' THEN 'ជីវិតមូលដ្ឋានមានកសិកម្ម វត្តអារាម និងទីផ្សារក្រុងជាស្នូល។ ការធ្វើដំណើរទៅប្រាសាទគួរភ្ជាប់ជាមួយការគោរពទីសក្ការៈ និងសហគមន៍ដែលរស់នៅជុំវិញ។'
    WHEN 'kandal' THEN 'កណ្ដាលមានវប្បធម៌ជាប់ទន្លេ ផ្សារ និងសហគមន៍កសិកម្ម។ កោះ និងភូមិជុំវិញអាចផ្តល់បទពិសោធន៍ស្ងប់ស្ងាត់ជាងការធ្វើដំណើរនៅកណ្ដាលភ្នំពេញ។'
    WHEN 'koh-kong' THEN 'វប្បធម៌មូលដ្ឋានមានទំនាក់ទំនងជាមួយសមុទ្រ ទន្លេ នេសាទ និងព្រៃ។ ការធ្វើដំណើរដែលគោរពធម្មជាតិ និងជ្រើសរើសសេវាកម្មមូលដ្ឋានជួយរក្សាតុល្យភាពរវាងទេសចរណ៍ និងបរិស្ថាន។'
    WHEN 'kratie' THEN 'ជីវិតតាមមេគង្គបង្ហាញតាមម្ហូបត្រី ការជិះកង់តាមភូមិ និងផ្សារមូលដ្ឋាន។ ការទស្សនាតំបន់ផ្សោតគួរគោរពចម្ងាយ និងមិនបង្កសំឡេងរំខាន។'
    WHEN 'mondulkiri' THEN 'សហគមន៍ជនជាតិដើមមានអត្តសញ្ញាណ និងទំនៀមទម្លាប់ផ្ទាល់ខ្លួន។ អ្នកទេសចរគួរសួរអនុញ្ញាតមុនថតរូប និងជ្រើសរើសបទពិសោធន៍ដែលគាំទ្រសហគមន៍ដោយផ្ទាល់។'
    WHEN 'preah-vihear' THEN 'វប្បធម៌ប្រាសាទ សាសនា និងជីវិតជនបទជាប់គ្នានៅក្នុងខេត្ត។ ការចូលតំបន់បេតិកភណ្ឌគួរប្រកាន់ខ្ជាប់ច្បាប់ទីតាំង និងគោរពទីសក្ការៈ។'
    WHEN 'prey-veng' THEN 'ម្ហូបខ្មែរ ផ្សារ និងជីវិតកសិកម្មជាផ្នែកនៃវប្បធម៌ប្រចាំថ្ងៃ។ ដំណើរដែលប្រើសេវាកម្មមូលដ្ឋានអាចជួយបង្កើតការចែករំលែកចំណូលទៅសហគមន៍។'
    WHEN 'pursat' THEN 'វប្បធម៌ជនបទភ្ជាប់ជាមួយត្រី ទន្លេ និងកសិកម្ម។ ផ្សារ និងវត្តអារាមក្នុងក្រុងអាចជាកន្លែងងាយស្រួលសម្រាប់មើលជីវិតប្រចាំថ្ងៃដោយមិនរំខានសហគមន៍។'
    WHEN 'ratanakiri' THEN 'វប្បធម៌ជនជាតិដើម និងផលិតផលក្នុងតំបន់ជាផ្នែកសំខាន់នៃបទពិសោធន៍រតនគិរី។ កាហ្វេ ផ្លែឈើ និងសិប្បកម្មអាចជាវិធីងាយស្រួលក្នុងការគាំទ្រអ្នកផលិតក្នុងតំបន់។'
    WHEN 'siem-reap' THEN 'សិល្បៈខ្មែរ ការរាំ របាំ អាហារ និងសិប្បកម្មជាផ្នែកធំនៃជីវិតសៀមរាប។ អ្នកទេសចរអាចបន្ថែមការទស្សនាទីផ្សារ សាលាសិល្បៈ និងសហគមន៍ក្រៅកណ្ដាលក្រុងទៅក្នុងដំណើរ។'
    WHEN 'phnom-penh' THEN 'វប្បធម៌រាជធានីរួមបញ្ចូលម្ហូបខ្មែរ កាហ្វេ ផ្សារ សិល្បៈ និងជីវិតតាមមាត់ទន្លេ។ ការដើរតាមផ្លូវចាស់ និងចូលផ្សារអាចបង្ហាញទីក្រុងក្នុងទម្រង់ដែលខុសពីទីតាំងទេសចរណ៍ធំៗ។'
    WHEN 'kampot' THEN 'ម្រេចកំពត អាហារសមុទ្រ ម្ហូបតាមមាត់ទន្លេ និងផលិតផលក្នុងស្រុកជាផ្នែកមួយនៃអត្តសញ្ញាណម្ហូបខេត្ត។ បរិយាកាសក្រុងយឺត និងហាងតូចៗជួយឱ្យស្គាល់ជីវិតមូលដ្ឋាន។'
    WHEN 'kep' THEN 'អាហារសមុទ្រ ជាពិសេសក្តាមជាមួយម្រេចកំពត ជាផ្នែកសំខាន់នៃអត្តសញ្ញាណកែប។ ការទិញផលិតផលពីអ្នកលក់មូលដ្ឋាន និងគោរពបរិស្ថានសមុទ្រគឺជាវិធីល្អក្នុងការរក្សាប្រភពចំណូលក្នុងតំបន់។'
    WHEN 'preah-sihanouk' THEN 'វប្បធម៌តំបន់ឆ្នេររួមបញ្ចូលម្ហូបសមុទ្រ ជីវិតអ្នកនេសាទ និងសេវាកម្មទេសចរណ៍តាមឆ្នេរ និងកោះ។ ការជ្រើសរើសសេវាកម្មដែលគោរពបរិស្ថានសមុទ្រជួយគាំទ្រតំបន់បានល្អ។'
    WHEN 'stung-treng' THEN 'ម្ហូបត្រី ទីផ្សារ និងជីវិតតាមទន្លេបង្ហាញអត្តសញ្ញាណមូលដ្ឋាន។ តំបន់សើម និងទន្លេគួរត្រូវបានទស្សនាដោយគោរពធម្មជាតិ និងសហគមន៍។'
    WHEN 'svay-rieng' THEN 'ផ្សារ ម្ហូបខ្មែរ និងជីវិតកសិកម្មជាផ្នែកសំខាន់នៃវប្បធម៌ស្វាយរៀង។ ដំណើរតាមទីប្រជុំជនតូចៗផ្តល់ឱកាសឃើញជីវិតមូលដ្ឋានដោយផ្ទាល់។'
    WHEN 'takeo' THEN 'ម្ហូបត្រីទឹកសាប វត្តអារាម និងផ្សារជាផ្នែកសាមញ្ញនៃជីវិតតាកែវ។ ការទស្សនាប្រាសាទគួរភ្ជាប់ជាមួយការគោរពទីសក្ការៈ និងសហគមន៍។'
    WHEN 'oddar-meanchey' THEN 'ជីវិតជនបទ ផ្សារ និងអាហារខ្មែរជាផ្នែកនៃបទពិសោធន៍នៅខេត្តព្រំដែន។ ការធ្វើដំណើរទៅតំបន់ឆ្ងាយគួររកមគ្គុទ្ទេសក៍ក្នុងស្រុក និងគោរពទីតាំងប្រវត្តិសាស្ត្រ។'
    WHEN 'pailin' THEN 'វប្បធម៌ប៉ៃលិនរួមបញ្ចូលម្ហូបមូលដ្ឋាន ផ្លែឈើ និងរឿងរ៉ាវត្បូង។ ប្រសិនបើទិញត្បូង គួរជ្រើសរើសប្រភពដែលអាចពន្យល់អំពីប្រភពទំនិញបានច្បាស់។'
    WHEN 'tboung-khmum' THEN 'ជីវិតកសិកម្ម សិប្បកម្ម និងម្ហូបមូលដ្ឋានជាចំណុចសំខាន់នៃវប្បធម៌ខេត្ត។ ការទិញផលិតផលពីអ្នកផលិត និងសហគមន៍ផ្ទាល់ជួយរក្សាតម្លៃនៅក្នុងតំបន់។'
    ELSE g.food_guide_km
  END,
  g.culture_en = CASE p.slug
    WHEN 'banteay-meanchey' THEN 'Local culture is closely connected to markets, farming and border communities. Trying regional food and visiting local markets offers a useful view of everyday life.'
    WHEN 'battambang' THEN 'Arts, performance and local Khmer food are central to Battambang’s identity. Markets, small eateries and rural communities offer a more local perspective beyond the main sights.'
    WHEN 'kampong-cham' THEN 'River life influences food, trade and daily routines. Island and riverside trips make it easy to see how communities live along the Mekong.'
    WHEN 'kampong-chhnang' THEN 'Pottery and freshwater food are part of the province’s local character. Buying directly from makers and respecting communities is a simple way to support local livelihoods.'
    WHEN 'kampong-speu' THEN 'Rural culture centres on farming, palm products and community life. Local food and agricultural products are a natural part of the travel experience.'
    WHEN 'kampong-thom' THEN 'Daily life revolves around farming, pagodas and local markets. Temple visits are best paired with respect for sacred spaces and the communities around them.'
    WHEN 'kandal' THEN 'River, market and farming communities shape local culture in Kandal. Island and village visits can provide a quieter experience than central Phnom Penh.'
    WHEN 'koh-kong' THEN 'Local life is connected to the sea, rivers, fishing and forests. Responsible travel and locally run services help balance tourism with the natural environment.'
    WHEN 'kratie' THEN 'Mekong life appears in freshwater food, village cycling and local markets. Dolphin trips should always maintain distance and avoid noise around the animals.'
    WHEN 'mondulkiri' THEN 'Indigenous communities have distinct identities and traditions. Visitors should ask before taking photographs and choose experiences that directly respect and support local communities.'
    WHEN 'preah-vihear' THEN 'Temple culture, religion and rural life meet across the province. Heritage visits should follow site rules and respect sacred spaces.'
    WHEN 'prey-veng' THEN 'Khmer food, markets and farming life are central to everyday culture. Using local services helps keep travel spending closer to communities.'
    WHEN 'pursat' THEN 'Rural life is closely connected to fish, waterways and farming. Town markets and pagodas are accessible places to observe daily life without intruding on communities.'
    WHEN 'ratanakiri' THEN 'Indigenous culture and local produce are important parts of the Ratanakiri experience. Coffee, fruit and crafts provide easy ways to support local producers.'
    WHEN 'siem-reap' THEN 'Khmer arts, dance, food and crafts are a major part of Siem Reap’s identity. Markets, arts spaces and communities outside the city centre can broaden the experience beyond Angkor.'
    WHEN 'phnom-penh' THEN 'Capital culture mixes Khmer food, coffee, markets, arts and riverside life. Walking older streets and visiting markets offers a different view of the city beyond major attractions.'
    WHEN 'kampot' THEN 'Kampot pepper, seafood, riverside food and local produce are central to the province’s food identity. The town’s slower pace and small businesses add to the local feel.'
    WHEN 'kep' THEN 'Seafood, especially crab with Kampot pepper, is central to Kep’s identity. Buying locally and respecting the marine environment helps keep tourism connected to local livelihoods.'
    WHEN 'preah-sihanouk' THEN 'Coastal culture includes seafood, fishing communities and tourism services around beaches and islands. Choosing businesses that respect the marine environment helps support the destination responsibly.'
    WHEN 'stung-treng' THEN 'Fish, markets and river life define much of the local character. Wetlands and river areas should be experienced with respect for both nature and nearby communities.'
    WHEN 'svay-rieng' THEN 'Markets, Khmer food and farming life are central to Svay Rieng’s culture. Travel through smaller towns gives a direct look at everyday provincial life.'
    WHEN 'takeo' THEN 'Freshwater fish, pagodas and local markets are part of daily life in Takeo. Temple visits are best combined with respect for sacred sites and surrounding communities.'
    WHEN 'oddar-meanchey' THEN 'Rural life, markets and Khmer food shape the border province’s everyday culture. Remote heritage visits are best made with local guidance and respect for historic places.'
    WHEN 'pailin' THEN 'Pailin’s local character includes regional food, fruit and the legacy of gemstones. When buying gems, choose sellers who can clearly explain the origin of their products.'
    WHEN 'tboung-khmum' THEN 'Farming, crafts and local food are central to the province’s culture. Buying directly from producers and community businesses helps keep value in the local economy.'
    ELSE g.food_guide_en
  END;