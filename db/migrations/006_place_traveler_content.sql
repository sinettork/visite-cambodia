USE cambodia_tourism;

CREATE TABLE place_guides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  place_id INT NOT NULL UNIQUE,
  about_km TEXT NULL,
  about_en TEXT NULL,
  history_km TEXT NULL,
  history_en TEXT NULL,
  highlights_km TEXT NULL,
  highlights_en TEXT NULL,
  visit_plan_km TEXT NULL,
  visit_plan_en TEXT NULL,
  tips_km TEXT NULL,
  tips_en TEXT NULL,
  source_urls TEXT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO place_guides (
  place_id,
  about_km, about_en,
  history_km, history_en,
  highlights_km, highlights_en,
  visit_plan_km, visit_plan_en,
  tips_km, tips_en,
  source_urls
)
SELECT
  p.id,

  CASE p.slug
    WHEN 'angkor-wat' THEN 'អង្គរវត្តជាវិមានសាសនាដ៏សំខាន់បំផុតមួយរបស់អង្គរ និងជានិមិត្តសញ្ញាដ៏ល្បីរបស់កម្ពុជា។ វាស្ថិតក្នុងតំបន់បុរាណអង្គរ ដែលជាបណ្តុំប្រាសាទ ផ្លូវ ទំនប់ និងប្រព័ន្ធទឹកដ៏ធំដែលបង្ហាញពីសមត្ថភាពរបស់អរិយធម៌ខ្មែរកាលពីសតវត្សរ៍មុន។'
    WHEN 'angkor-thom' THEN 'អង្គរធំមានន័យថា “ក្រុងធំ” និងជាមជ្ឈមណ្ឌលទីក្រុងដ៏សំខាន់របស់អង្គរក្រោយសតវត្សរ៍ទី១២។ ទីក្រុងមានកំពែង និងគូទឹកព័ទ្ធជុំវិញ ហើយបាយ័នស្ថិតនៅកណ្ដាល ជាមួយតំបន់បុរាណសំខាន់ៗដូចជា ព្រះបរមរាជវាំងបុរាណ បាពួន និងរានហាលព្រះពន្លាជ័យ។'
    WHEN 'royal-palace' THEN 'ព្រះបរមរាជវាំងភ្នំពេញជាបេះដូងនៃស្ថាប័នរាជវាំងសម័យទំនើបរបស់កម្ពុជា។ សំណង់សំខាន់ៗរួមមានព្រះទីនាំងចន្ទឆាយ ព្រះទីនាំងសម្ដេចព្រះមហាក្សត្រី និងបរិវេណព្រះវិហារព្រះកែវមរកត ឬវត្តប្រាក់។'
    WHEN 'wat-phnom' THEN 'វត្តភ្នំជាវត្តប្រវត្តិសាស្ត្រស្ថិតលើកូនភ្នំកណ្ដាលរាជធានី និងជាទីតាំងដែលរឿងព្រេងអំពីលោកយាយពេញត្រូវបានភ្ជាប់ជាមួយដើមកំណើតឈ្មោះភ្នំពេញ។ ទីតាំងនេះនៅតែជាទីសក្ការៈសម្រាប់អ្នករស់នៅ និងអ្នកមកទស្សនា។'
    WHEN 'bokor-national-park' THEN 'ភ្នំបូកគោស្ថិតក្នុងជួរភ្នំដំរី និងជាតំបន់ធម្មជាតិដ៏សំខាន់របស់កំពត។ ទេសភាពខ្ពង់រាប ព្រៃ សំណង់បុរាណនៅតំបន់ Bokor Hill Station និងទឹកជ្រោះប៉ុបពោកវិលធ្វើឱ្យទីនេះមានការលាយបញ្ចូលរវាងធម្មជាតិ និងប្រវត្តិសាស្ត្រ។'
    WHEN 'kep-crab-market' THEN 'ផ្សារក្តាមកែបជាតំបន់មាត់សមុទ្រដែលភ្ជាប់ការនេសាទក្នុងតំបន់ជាមួយអាហារសមុទ្រ។ ភ្ញៀវអាចឃើញអ្នកនេសាទនាំយកផលសមុទ្រឡើង និងជ្រើសរើសអាហារសមុទ្រដើម្បីចម្អិនតាមហាងជុំវិញផ្សារ។'
    WHEN 'koh-rong' THEN 'កោះរ៉ុងជាកោះទេសចរណ៍នៅឈូងសមុទ្រថៃ ដែលមានឆ្នេរខ្សាច់ស ព្រៃ និងតំបន់សម្រាប់សកម្មភាពសមុទ្រ។ កោះមានតំបន់ស្នាក់នៅ និងបទពិសោធន៍ខុសៗគ្នា ដូច្នេះការជ្រើសរើសឆ្នេរ និងតំបន់ស្នាក់នៅមានឥទ្ធិពលលើបទពិសោធន៍ដំណើរ។'
    WHEN 'yeak-laom-lake' THEN 'បឹងយក្សឡោមជាបឹងភ្នំភ្លើងនៅជិតបានលុង ក្នុងរតនគិរី។ បឹងមានរាងមូលជិតល្អឥតខ្ចោះ ទឹកថ្លា និងព្រៃជុំវិញ ហើយក៏មានសារៈសំខាន់ខាងវប្បធម៌សម្រាប់សហគមន៍ជនជាតិដើមនៅតំបន់។'
  END,

  CASE p.slug
    WHEN 'angkor-wat' THEN 'Angkor Wat is one of the most important monuments within the Angkor archaeological complex and one of Cambodia’s defining cultural symbols. It forms part of a much larger landscape of temples, roads, reservoirs and hydraulic infrastructure that developed around the Khmer capital.'
    WHEN 'angkor-thom' THEN 'Angkor Thom means “Great City” and became a major urban centre of Angkor from the late 12th century. Its walls and moat enclose a planned city with Bayon at its centre and important monuments including the former Royal Palace area, Baphuon and the Terrace of the Elephants.'
    WHEN 'royal-palace' THEN 'Phnom Penh’s Royal Palace is the centre of Cambodia’s modern royal complex. The grounds include major ceremonial buildings and the Silver Pagoda compound, making it one of the capital’s most important places for understanding royal architecture and living heritage.'
    WHEN 'wat-phnom' THEN 'Wat Phnom is a historic hilltop pagoda in central Phnom Penh and an important part of the city’s origin story. The site remains an active place of worship as well as a compact heritage stop in the capital.'
    WHEN 'bokor-national-park' THEN 'Bokor lies in the Elephant Mountains and is one of Kampot’s major nature-and-heritage destinations. Highland forest, old buildings at Bokor Hill Station and Popokvil Waterfall give the area a mix of landscape, colonial-era history and outdoor travel.'
    WHEN 'kep-crab-market' THEN 'Kep Crab Market is a coastal food destination where fishing and seafood dining meet. Visitors can see local seafood being brought ashore and choose dishes at the small restaurants along the waterfront.'
    WHEN 'koh-rong' THEN 'Koh Rong is an island in the Gulf of Thailand known for white-sand beaches, forest and marine activities. Different parts of the island have different atmospheres, so choosing the right beach and accommodation area matters to the trip.'
    WHEN 'yeak-laom-lake' THEN 'Yeak Laom Lake is a volcanic crater lake near Banlung in Ratanakiri. Its clear water, forest setting and nearly circular shape make it one of the province’s signature natural sites, while the lake also carries cultural significance for nearby Indigenous communities.'
  END,

  CASE p.slug
    WHEN 'angkor-wat' THEN 'ផ្នែកដែលគួរយកចិត្តទុកដាក់រួមមានបណ្ណសិលាចារឹក និងចម្លាក់តាមជញ្ជាំងរានហាល កំពូលប្រាង្គកណ្ដាល និងទស្សនីយភាពជុំវិញគូទឹក។ គួរទុកពេលសម្រាប់ដើររកព័ត៌មានអំពីស្ថាបត្យកម្ម មិនមែនត្រឹមតែថតរូបទេ។'
    WHEN 'angkor-thom' THEN 'គួរមើលទ្វារទីក្រុងទាំងផ្លូវចូល បាយ័ន និងកំពែងជុំវិញ។ បាពួន ស្រះស្រង់ និងតំបន់រាជវាំងបុរាណអាចបញ្ចូលក្នុងផ្លូវទស្សនាដូចគ្នា។ ចម្លាក់មុខ និងរូបភាពតាមរានហាលជួយឱ្យយល់ពីអត្តសញ្ញាណរបស់ទីក្រុង។'
    WHEN 'royal-palace' THEN 'ផ្តោតលើព្រះទីនាំងចន្ទឆាយ ព្រះទីនាំងសំខាន់ៗ បរិវេណវត្តប្រាក់ និងស្នាដៃសិល្បៈខ្មែរនៅក្នុងបរិវេណ។ ទីតាំងមានន័យជាផ្នែកមួយនៃជីវិតរាជវាំងបច្ចុប្បន្ន មិនមែនជាប្រាសាទបុរាណប៉ុណ្ណោះទេ។'
    WHEN 'wat-phnom' THEN 'ឡើងតាមជណ្តើរខាងកើតទៅកាន់វិហារ និងចេតិយ ហើយសង្កេតមើលរូបសំណាកសត្វតោ និងនាគនៅច្រកចូល។ អ្នកអាចភ្ជាប់ការទស្សនាជាមួយតំបន់វត្តឧណ្ណាលោម និងមាត់ទន្លេ។'
    WHEN 'bokor-national-park' THEN 'តំបន់ Bokor Hill Station មានសំណង់ប្រវត្តិសាស្ត្រដែលធ្វើឱ្យទេសភាពខុសពីឧទ្យានធម្មជាតិធម្មតា។ អាចបញ្ចូលទឹកជ្រោះប៉ុបពោកវិល និងទេសភាពភ្នំក្នុងដំណើរតែមួយ។'
    WHEN 'kep-crab-market' THEN 'សម្រាប់បទពិសោធន៍ពេញលេញ គួរដើរមើលតំបន់ចុះទូក និងសំណង់តាមមាត់សមុទ្រ មុនជ្រើសម្ហូប។ ក្តាមជាមួយម្រេចកំពតគឺជាម្ហូបដែលភ្ញៀវជាច្រើនស្វែងរក ប៉ុន្តែអាចជ្រើសរើសអាហារសមុទ្រផ្សេងៗតាមការផ្គត់ផ្គង់ថ្ងៃនោះ។'
    WHEN 'koh-rong' THEN 'ចំណុចសំខាន់គឺឆ្នេរ សកម្មភាពសមុទ្រ ផ្លូវដើរកាត់ព្រៃ និងទេសភាពថ្ងៃលិច។ បទពិសោធន៍ខុសគ្នាខ្លាំងរវាងតំបន់ដែលមានសេវាទេសចរណ៍ច្រើន និងឆ្នេរស្ងប់ស្ងាត់។'
    WHEN 'yeak-laom-lake' THEN 'អាចដើរជុំវិញបឹង ទស្សនាព្រៃ និងសិក្សាព័ត៌មាននៅមជ្ឈមណ្ឌលអ្នកទស្សនា។ ប្រសិនបើមានសកម្មភាពហែលទឹក គួរតាមដានច្បាប់ និងការណែនាំរបស់អ្នកគ្រប់គ្រងតំបន់។'
  END,

  CASE p.slug
    WHEN 'angkor-wat' THEN 'សម្រាប់អ្នកទស្សនាដំបូង គួររៀបចំជាមួយអង្គរធំ និងប្រាសាទសំខាន់ផ្សេងទៀតជាថ្ងៃមួយ ឬបែងចែកច្រើនថ្ងៃបើចង់ទស្សនាដោយមិនប្រញាប់។ ម៉ោង និងសំបុត្រតំបន់អង្គរគួរបញ្ជាក់ពីប្រភពផ្លូវការមុនទៅ។'
    WHEN 'angkor-thom' THEN 'ទុកពេលយ៉ាងហោចណាស់ ១–២ម៉ោងសម្រាប់អង្គរធំ ប្រសិនបើចង់ឈប់មើលបាយ័ន និងកំពែងដោយមិនប្រញាប់។ គួររៀបចំជាមួយអង្គរវត្ត និងតាព្រហ្មក្នុងថ្ងៃតែមួយតាមផ្លូវទេសចរណ៍ដែលសមរម្យ។ ព័ត៌មានសំបុត្រ និងច្រកចូលគួរបញ្ជាក់ពី Angkor Enterprise/APSARA មុនចេញដំណើរ។'
    WHEN 'royal-palace' THEN 'គួររៀបចំជាមួយសារមន្ទីរជាតិ និងមាត់ទន្លេក្នុងពាក់កណ្តាលថ្ងៃដូចគ្នា។ ពិនិត្យម៉ោងបើក និងតំបន់ដែលអនុញ្ញាតឱ្យចូលមុនទៅ ព្រោះរាជវាំងជាតំបន់រស់នៅ និងពិធីការរបស់ព្រះមហាក្សត្រ។'
    WHEN 'wat-phnom' THEN 'វត្តភ្នំសមស្របសម្រាប់ការឈប់ ៣០–៦០នាទីក្នុងដំណើរទីក្រុង។ ការឡើងជណ្តើរមិនយូរ ប៉ុន្តែគួរទុកពេលសម្រាប់ការអធិស្ឋាន និងសម្រាកក្រោមម្លប់។'
    WHEN 'bokor-national-park' THEN 'គួរចេញពីកំពតព្រឹក ដើម្បីទុកពេលសម្រាប់ផ្លូវឡើងភ្នំ ទីតាំងប្រវត្តិសាស្ត្រ និងទឹកជ្រោះ។ អាកាសធាតុនៅលើភ្នំអាចខុសពីក្រុងកំពត ដូច្នេះគួរត្រៀមសម្លៀកបំពាក់ស្រាលសម្រាប់ត្រជាក់ និងតាមដានអាកាសធាតុ។'
    WHEN 'kep-crab-market' THEN 'អាចចូលបានងាយជាមួយការទស្សនាឆ្នេរ និងឧទ្យានជាតិកែប។ មុនកុម្ម៉ង់ អ្នកគួរសួរតម្លៃតាមទំហំ និងទម្ងន់ ឬតាមមុខម្ហូបឱ្យច្បាស់។'
    WHEN 'koh-rong' THEN 'បើផែនការរួមមានកោះ គួរទុក buffer សម្រាប់ការធ្វើដំណើរតាមទូក និងអាកាសធាតុ។ ជ្រើសរើសកន្លែងស្នាក់នៅតាមឆ្នេរដែលសមនឹងគោលបំណង ហើយបញ្ជាក់ចំណតទូក និងម៉ោងដំណើរត្រឡប់ជាមុន។'
    WHEN 'yeak-laom-lake' THEN 'បឹងស្ថិតប្រហែល ៥គីឡូម៉ែត្រពីបានលុង ដូច្នេះសមស្របសម្រាប់ដំណើរពាក់កណ្តាលថ្ងៃ។ ត្រៀមទឹក ផ្ទាំងការពារកម្តៅ និងគោរពតំបន់ដែលសហគមន៍កំណត់។'
  END,

  CASE p.slug
    WHEN 'angkor-wat' THEN 'អង្គរជាទីកន្លែងសក្ការៈ។ ស្លៀកពាក់សមរម្យ មិនឡើង ឬប៉ះប្រាសាទ និងគោរពអ្នកអធិស្ឋាន និងព្រះសង្ឃ។ អនុវត្តតាម Visitor Code of Conduct របស់ APSARA។'
    WHEN 'angkor-thom' THEN 'គោរពប្រាសាទជាទីសក្ការៈ មិនឡើងលើសំណង់ដែលហាមឃាត់ និងកុំប៉ះចម្លាក់។ ប្រើផ្លូវដែលបានកំណត់ ដើម្បីកាត់បន្ថយផលប៉ះពាល់ដល់បេតិកភណ្ឌ។'
    WHEN 'royal-palace' THEN 'ស្លៀកពាក់សមរម្យ និងគោរពតំបន់ព្រះរាជវាំង។ កុំសន្មត់ថាតំបន់ទាំងអស់បើកសម្រាប់សាធារណៈ ហើយគោរពការណែនាំរបស់បុគ្គលិកនៅទីតាំង។'
    WHEN 'wat-phnom' THEN 'ជាទីសក្ការៈ សូមនិយាយសំឡេងសមរម្យ និងស្លៀកពាក់គួរសម។ កុំប៉ះ ឬរំខានវត្ថុសក្ការៈ និងគោរពអ្នកកំពុងបួងសួង។'
    WHEN 'bokor-national-park' THEN 'កុំចាកចេញពីផ្លូវសុវត្ថិភាពនៅតំបន់ភ្នំ និងកុំយករុក្ខជាតិ ឬវត្ថុធម្មជាតិចេញពីតំបន់ការពារ។ សម្រាប់សំណង់ចាស់ គួរមើលពីចម្ងាយតាមផ្លូវដែលអនុញ្ញាត។'
    WHEN 'kep-crab-market' THEN 'តម្លៃអាហារសមុទ្រអាចប្រែប្រួលតាមទំហំ និងការផ្គត់ផ្គង់។ សួរតម្លៃមុនចម្អិន ហើយជៀសវាងកាកសំណល់ប្លាស្ទិកនៅមាត់សមុទ្រ។'
    WHEN 'koh-rong' THEN 'គោរពបរិស្ថានសមុទ្រ មិនចោលសំរាម និងកុំយកផ្កាថ្ម ឬសត្វសមុទ្រចេញពីធម្មជាតិ។ សកម្មភាពតាមសមុទ្រគួរត្រូវធ្វើតាមការណែនាំសុវត្ថិភាព និងអាកាសធាតុ។'
    WHEN 'yeak-laom-lake' THEN 'បឹងមានសារៈសំខាន់ខាងវប្បធម៌សម្រាប់សហគមន៍ជនជាតិដើម។ គោរពតំបន់សក្ការៈ សួរអនុញ្ញាតមុនថតរូបមនុស្ស និងកុំចោលសំរាមក្នុងព្រៃ ឬបឹង។'
  END,

  CASE p.slug
    WHEN 'angkor-wat' THEN CONCAT('https://apsaraauthority.gov.kh/temples-new/', CHAR(10), 'https://whc.unesco.org/en/list/668/')
    WHEN 'angkor-thom' THEN CONCAT('https://apsaraauthority.gov.kh/temples-new/', CHAR(10), 'https://apsaraauthority.gov.kh/our-work/tourism-info/', CHAR(10), 'https://whc.unesco.org/en/list/668/')
    WHEN 'royal-palace' THEN 'https://www.tourismcambodia.com/travelguides/provinces/phnom-penh/what-to-see/18_royal-palace.htm'
    WHEN 'wat-phnom' THEN 'https://www.tourismcambodia.com/travelguides/provinces/phnom-penh/what-to-see/22_wat-phnom-hill.htm'
    WHEN 'bokor-national-park' THEN CONCAT('https://www.tourismcambodia.com/travelguides/provinces/kampot/what-to-see/37_bokor-hill-station.htm', CHAR(10), 'https://www.tourismcambodia.com/news/localnews/23943/preserving-history-on-bokor-hill-station.htm')
    WHEN 'kep-crab-market' THEN CONCAT('https://www.tourismcambodia.com/travelguides/provinces/kep/where-to-eat.htm', CHAR(10), 'https://www.tourismcambodia.com/travelguides/provinces/kep.htm')
    WHEN 'koh-rong' THEN 'https://www.tourismcambodia.com/travelguides/provinces/sihanouk-ville/what-to-see/427_koh-rong-island.htm'
    WHEN 'yeak-laom-lake' THEN CONCAT('https://www.tourismcambodia.com/travelguides/provinces/rattanakiri/what-tosee/216_beung-yeak-loam.htm', CHAR(10), 'https://www.tourismcambodia.com/visit-cambodia/attractions/rattanakiri.htm')
  END
FROM places p
WHERE p.slug IN (
  'angkor-wat','angkor-thom','royal-palace','wat-phnom','bokor-national-park',
  'kep-crab-market','koh-rong','yeak-laom-lake'
)
ON DUPLICATE KEY UPDATE
  about_km = VALUES(about_km),
  about_en = VALUES(about_en),
  history_km = VALUES(history_km),
  history_en = VALUES(history_en),
  highlights_km = VALUES(highlights_km),
  highlights_en = VALUES(highlights_en),
  visit_plan_km = VALUES(visit_plan_km),
  visit_plan_en = VALUES(visit_plan_en),
  tips_km = VALUES(tips_km),
  tips_en = VALUES(tips_en),
  source_urls = VALUES(source_urls);
