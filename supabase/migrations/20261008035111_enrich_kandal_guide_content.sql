-- Enrich Kandal province guide content from Cambodian government tourism sources and cross-checked reference material.

update public.province_guides g
set
  overview_km = 'កណ្ដាលព័ទ្ធជុំវិញរាជធានីភ្នំពេញ និងជាតំបន់ភ្ជាប់រវាងទីក្រុង ជនបទ ដងទន្លេ និងសហគមន៍កសិកម្ម។ រាជធានីខេត្តគឺក្រុងតាខ្មៅ ហើយខេត្តក៏រក្សាទីតាំងប្រវត្តិសាស្ត្រសំខាន់ៗដូចជា ឧដុង្គ ដែលធ្លាប់ជារាជធានីរបស់កម្ពុជាអស់រយៈពេលជាច្រើនសតវត្សរ៍។',
  overview_en = 'Kandal surrounds Phnom Penh and forms a transition between the capital, river landscapes, farming communities and historic sites. Its provincial capital is Ta Khmau, while Oudong preserves the memory of a former royal capital of Cambodia.',
  story_km = 'កណ្ដាលមានទេសភាពវាលទំនាប និងជីវិតជាប់ទន្លេ ដែលភ្ជាប់ជាមួយមេគង្គ បាសាក់ និងសហគមន៍តាមកោះ។ ដំណើរនៅខេត្តនេះអាចផ្លាស់ពីបរិយាកាសជិតរាជធានី ទៅភូមិជនបទ ប្រាសាទ វត្ត និងសិប្បកម្មបុរាណបានក្នុងថ្ងៃតែមួយ។',
  story_en = 'Kandal is shaped by lowland plains, river communities and island settlements connected to the Mekong and Bassac river systems. A trip can move quickly from the edge of the capital into villages, temples, historic sites and traditional craft communities.',
  history_km = 'ចំណុចប្រវត្តិសាស្ត្រដ៏សំខាន់បំផុតរបស់កណ្ដាលគឺឧដុង្គ ដែលធ្លាប់ជារាជធានីរបស់កម្ពុជារយៈពេលពីឆ្នាំ 1618 ដល់ 1866។ តំបន់ភ្នំឧដុង្គមានចេតិយ និងសំណង់សាសនាដែលភ្ជាប់នឹងរាជវង្សខ្មែរ រួមទាំងវិហារ ព្រះអង្គធំ និងទីតាំងដែលរំលឹកពីសហគមន៍ចាមមូស្លីមនៅតំបន់។ ប្រវត្តិសាស្ត្រខេត្តក៏បន្តតាមវត្ត ប្រាសាទ និងសហគមន៍តាមដងទន្លេ។',
  history_en = 'Kandal’s most important historical landmark is Oudong, which served as a royal capital of Cambodia from 1618 to 1866. The hills preserve royal stupas and religious structures, including the 18-cubit Buddha sanctuary, while the wider site also reflects the province’s long connections between royal, Buddhist and Cham Muslim communities. History continues through pagodas, temples and river settlements across the province.',
  culture_km = 'វប្បធម៌កណ្ដាលមានភាពជាប់ទាក់ទងនឹងជីវិតតាមទន្លេ ទីផ្សារ កសិកម្ម និងសិប្បកម្មគ្រួសារ។ កោះដាច់ និងមជ្ឈមណ្ឌលសិប្បកម្មនៅលើកោះល្បីដោយការត្បាញសូត្រ ក្រមា និងផលិតផលសិប្បកម្មផ្សេងៗ។ ការទស្សនាភូមិ និងសហគមន៍តាមទន្លេអាចផ្តល់ភាពយល់ដឹងពីរបៀបរស់នៅជាក់ស្តែងជាងការធ្វើដំណើរនៅកណ្ដាលរាជធានី។',
  culture_en = 'Kandal’s culture is closely tied to riverside life, markets, farming and household crafts. Koh Dach and its handicraft centre are especially associated with silk weaving, krama and other traditional products. Visiting villages and community workshops offers a more direct view of local life than staying only around central Phnom Penh.',
  travel_km = 'កណ្ដាលសមស្របសម្រាប់ដំណើរថ្ងៃចេញពីភ្នំពេញ ប៉ុន្តែអាចរៀបចំជាដំណើរ 1–2 ថ្ងៃ ប្រសិនបើចង់បញ្ចូលឧដុង្គ កោះដាច់ និងតំបន់ជនបទតាមទន្លេ។ ឧដុង្គសមស្របសម្រាប់អ្នកចាប់អារម្មណ៍ប្រវត្តិសាស្ត្រ និងទេសភាពពីលើភ្នំ ខណៈកោះដាច់ផ្តោតលើសិប្បកម្ម និងជីវិតសហគមន៍។ មុនធ្វើដំណើរ គួរបញ្ជាក់ស្ថានភាពផ្លូវ ម៉ោងបើក និងសេវាដឹកជញ្ជូនតាមតំបន់ ព្រោះព័ត៌មានទាំងនេះអាចផ្លាស់ប្តូរ។',
  travel_en = 'Kandal works well as a day trip from Phnom Penh, but allow 1–2 days if you want to combine Oudong, Koh Dach and rural riverside areas. Oudong is strongest for history and hilltop views, while Koh Dach is better for traditional crafts and community life. Confirm roads, opening arrangements and local transport before departure because operational details can change.',
  attractions_km = 'គួរចាប់ផ្តើមពីភ្នំឧដុង្គ សម្រាប់រាជធានីបុរាណ ចេតិយ និងទេសភាពជនបទ។ បន្ទាប់មកអាចបន្តទៅកោះដាច់ និងមជ្ឈមណ្ឌលសិប្បកម្ម ដើម្បីស្គាល់ការត្បាញសូត្រ និងជីវិតតាមមេគង្គ។ កន្លែងដែលអាចបញ្ចូលក្នុងផ្លូវដំណើររួមមាន វត្តគៀនស្វាយក្រៅ ភ្នំប្រសិទ្ធិ វត្តអង្គរកេីយ និងភ្នំថ្មម៉ុន តាមអ្វីដែលសមនឹងពេលវេលា។',
  attractions_en = 'Start with Phnom Udong for royal history, stupas and broad countryside views. Continue to Koh Dach and its handicraft centre to see silk weaving and Mekong island life. Other places worth checking for a route include Kean Svay Krau Pagoda, Phnom Prasith, Ang Kor Chey Pagoda and Wat Phnom Thom Mond, depending on your available time and current access.',
  stay_guide_km = 'ប្រសិនបើធ្វើដំណើរថ្ងៃពីភ្នំពេញ អាចមិនចាំបាច់ផ្លាស់ប្តូរកន្លែងស្នាក់នៅឡើយ។ ប្រសិនបើចង់ស្នាក់មួយយប់ គួរជ្រើសទីតាំងនៅតាខ្មៅ ឬតំបន់ដែលងាយតភ្ជាប់ទៅផ្លូវចូលឧដុង្គ និងកោះដាច់។ ព័ត៌មានសណ្ឋាគារ និងតម្លៃគួរបញ្ជាក់ជាក់ស្តែងមុនកក់។',
  stay_guide_en = 'For a day trip from Phnom Penh, an overnight stay may not be necessary. For a slower one-night route, choose accommodation in Ta Khmau or another location that reduces driving between the province’s main sights. Verify current room availability, location and pricing before booking.',
  food_guide_km = 'អាហារនៅកណ្ដាលអាចស្គាល់តាមផ្សារ ភូមិ និងតំបន់មាត់ទន្លេ។ នៅជុំវិញឧដុង្គ ក៏មានអាហារមូលដ្ឋាន និងផលិតផលពីត្នោតដែលភ្ញៀវអាចសាកបាន។ សម្រាប់បទពិសោធន៍ប្រចាំតំបន់ គួរជ្រើសហាង ឬទីផ្សារដែលមានអតិថិជនមូលដ្ឋាន និងសួរតម្លៃមុនកុម្ម៉ង់។',
  food_guide_en = 'Food in Kandal is easiest to experience through local markets, village stops and riverside eateries. Around Oudong, visitors can also find simple local food and palm products. For a more local experience, favour busy community eateries and ask clearly about prices before ordering.',
  source_urls = jsonb_build_array(
    'https://tourismcambodia.org/public/provinces/56/kandal',
    'https://tourismcambodia.org/public/official-activities/serene-and-scenic-attraction',
    'https://www.information.gov.kh/articles/110163',
    'https://en.wikipedia.org/wiki/Kandal_province'
  ),
  updated_at = now()
from public.provinces p
where g.province_id = p.id
  and p.slug = 'kandal';
