-- Research-backed editorial expansion for all provinces and existing tourism places.
-- Sources prioritize Cambodia Ministry of Tourism, UNESCO/conservation references where relevant,
-- and Wikipedia for cross-checking geographic/historical context.

update public.province_guides g
set
  source_urls = case p.slug
    when 'banteay-meanchey' then jsonb_build_array('https://www.tourismcambodia.org/provinces/67/banteay-meanchey','https://en.wikipedia.org/wiki/Banteay_Meanchey_province')
    when 'battambang' then jsonb_build_array('https://www.tourismcambodia.org/provinces/58/battambang','https://en.wikipedia.org/wiki/Battambang_province')
    when 'kampong-cham' then jsonb_build_array('https://www.tourismcambodia.org/provinces/59/kampong-cham','https://en.wikipedia.org/wiki/Kampong_Cham_province')
    when 'kampong-chhnang' then jsonb_build_array('https://www.tourismcambodia.org/provinces/60/kampong-chhnang','https://en.wikipedia.org/wiki/Kampong_Chhnang_province')
    when 'kampong-speu' then jsonb_build_array('https://www.tourismcambodia.org/provinces/61/kampong-speu','https://en.wikipedia.org/wiki/Kampong_Speu_province')
    when 'kampong-thom' then jsonb_build_array('https://www.tourismcambodia.org/provinces/55/kampong-thom','https://en.wikipedia.org/wiki/Kampong_Thom_province','https://whc.unesco.org/en/list/1532/')
    when 'kandal' then jsonb_build_array('https://www.tourismcambodia.org/provinces/56/kandal','https://en.wikipedia.org/wiki/Kandal_province')
    when 'koh-kong' then jsonb_build_array('https://www.tourismcambodia.org/provinces/54/koh-kong','https://en.wikipedia.org/wiki/Koh_Kong_province')
    when 'kratie' then jsonb_build_array('https://www.tourismcambodia.org/provinces/50/kratie','https://en.wikipedia.org/wiki/Krati%C3%A9_Province')
    when 'mondulkiri' then jsonb_build_array('https://www.tourismcambodia.org/provinces/46/mondulkiri','https://en.wikipedia.org/wiki/Mondulkiri_Province')
    when 'preah-vihear' then jsonb_build_array('https://www.tourismcambodia.org/provinces/51/preah-vihear','https://en.wikipedia.org/wiki/Preah_Vihear_Province','https://whc.unesco.org/en/list/1224/')
    when 'prey-veng' then jsonb_build_array('https://www.tourismcambodia.org/provinces/65/prey-veng','https://en.wikipedia.org/wiki/Prey_Veng_province')
    when 'pursat' then jsonb_build_array('https://www.tourismcambodia.org/provinces/62/pursat','https://en.wikipedia.org/wiki/Pursat_province')
    when 'stung-treng' then jsonb_build_array('https://www.tourismcambodia.org/provinces/49/stung-treng','https://en.wikipedia.org/wiki/Stung_Treng_province','https://rsis.ramsar.org/')
    when 'svay-rieng' then jsonb_build_array('https://www.tourismcambodia.org/provinces/66/svay-rieng','https://en.wikipedia.org/wiki/Svay_Rieng_province')
    when 'takeo' then jsonb_build_array('https://www.tourismcambodia.org/provinces/57/takeo','https://en.wikipedia.org/wiki/Takeo_province')
    when 'oddar-meanchey' then jsonb_build_array('https://www.tourismcambodia.org/provinces/63/oddar-meanchey','https://en.wikipedia.org/wiki/Oddar_Meanchey_province')
    when 'pailin' then jsonb_build_array('https://www.tourismcambodia.org/provinces/64/pailin','https://en.wikipedia.org/wiki/Pailin_province')
    when 'tboung-khmum' then jsonb_build_array('https://www.tourismcambodia.org/provinces/245/tbong-khmum','https://en.wikipedia.org/wiki/Tbong_Khmum_Province')
    when 'siem-reap' then jsonb_build_array('https://www.tourismcambodia.org/provinces/47/siem-reap','https://en.wikipedia.org/wiki/Siem_Reap_province','https://whc.unesco.org/en/list/668/','https://apsaraauthority.gov.kh/temples/')
    when 'phnom-penh' then jsonb_build_array('https://www.tourismcambodia.org/provinces/44/phnom-penh-capital-city','https://en.wikipedia.org/wiki/Phnom_Penh')
    when 'kampot' then jsonb_build_array('https://www.tourismcambodia.org/provinces/52/kampot','https://en.wikipedia.org/wiki/Kampot_province')
    when 'kep' then jsonb_build_array('https://www.tourismcambodia.org/provinces/53/kep','https://en.wikipedia.org/wiki/Kep_province')
    when 'preah-sihanouk' then jsonb_build_array('https://www.tourismcambodia.org/provinces/48/preah-sihanouk','https://en.wikipedia.org/wiki/Preah_Sihanouk_Province')
    when 'ratanakiri' then jsonb_build_array('https://www.tourismcambodia.org/provinces/45/rattanakiri','https://en.wikipedia.org/wiki/Ratanakiri_Province')
    else source_urls
  end,
  attractions_en = case p.slug
    when 'banteay-meanchey' then 'Key places include Banteay Chhmar, Ang Trapeang Thmor, Banteay Neang, Banteay Torp, Phnom Bak and Phnom Chen Chung.'
    when 'battambang' then 'Build around the riverside old town, Phnom Sampov, the Bamboo Train, Wat Ek Phnom, Prasat Banan, Baset Temple, Sek Sak and Kamping Poy.'
    when 'kampong-cham' then 'Highlights include Wat Nokor Bachey, Han Chey, Phnom Pros–Phnom Srei, Prey Nor Kor, the riverside, the former King’s Residence and Banteay Prey Nokor.'
    when 'kampong-chhnang' then 'Explore pottery villages around Ondong Rossey, Tonlé Sap floating communities, Phnom Neang Kang Rey, Phnom Krang Dei Meas and the riverside town.'
    when 'kampong-speu' then 'Key routes include Kirirom National Park, Phnom Aural approaches, Te Teuk Pus hot spring, Phnom Prey Khmer and rural palm-sugar landscapes.'
    when 'kampong-thom' then 'Prioritise Sambor Prei Kuk, Phnom Santuk, Prasat Andet, Prasat Kok Rokar, Prasat Kuhak Nokor and stone-carving areas.'
    when 'kandal' then 'Prioritise Phnom Udong, Koh Dach and its Handicraft Centre, Phnom Prasith, Kean Svay Krau Pagoda, Ang Kor Chey Pagoda, Phnom Edtharoes, Sa Ang Mountain and Wat Phnom Thom Mond.'
    when 'koh-kong' then 'Highlights include the Mangrove Forest, Tatai Waterfall, Koh Moul, Lam Da Beach, Kbal Chhay Prek Koh Waterfall and Sner Beach.'
    when 'kratie' then 'Key experiences include Kampi dolphin pools, Koh Pdao, Phnom Sopor Kaley, Phnom Preah, Vihear Sarsar Mouy Rouy, Kampi Picnic and Phnom Sambok.'
    when 'mondulkiri' then 'Prioritise Bou Sra Waterfall, Chrey Thom, Sea Forest, ethical elephant sanctuaries, Bunong community routes, Dak Dam and nearby forest waterfalls.'
    when 'preah-vihear' then 'Major heritage routes include Preah Vihear Temple and Koh Ker, alongside northern temple landscapes and rural mountain areas.'
    when 'prey-veng' then 'Key stops include Ba Phnom, Nokor Phnom, Vihear Chan, Chong Srok Temple, Baray Andet, Viel Brang and the rural Mekong landscape.'
    when 'pursat' then 'Explore Kampong Luang floating village, Pursat marble-carving workshops, Veal Veng, Areng Valley, Bak Tra rapids and northern Cardamom landscapes.'
    when 'stung-treng' then 'Highlights include the Stung Treng Ramsar wetland, Sopheakmith Waterfall, Mekong islands, O Pong Mohn, Kantuy Ko and routes for birds, dolphins, kayaking and trekking.'
    when 'svay-rieng' then 'Key stops include Prey Ba Sak, Bavet border area, Waiko River landscapes, Prasat Chea Hao and Prasat Basac.'
    when 'takeo' then 'Prioritise Phnom Chisor, Angkor Borei, Phnom Da, Tonle Bati, Ta Prohm, Yeay Pov, Neang Khmao, Ta Mao wildlife facilities and silk-and-krama villages.'
    when 'oddar-meanchey' then 'Explore Anlong Veng historical sites, Ta Mok House, the Dangrek escarpment, Cham Pey Waterfall and remote northern heritage landscapes.'
    when 'pailin' then 'Highlights include Phnom Yat, Wat Rattanak Sorphon, Otavao Waterfall, Phnom Keuy, Goh-Ay Mountain and former gem-mining landscapes.'
    when 'tboung-khmum' then 'Look for Memot prehistoric earthworks, Chup rubber plantations, Mekong riverside villages, Wat Preah Theat Thmor Da and rural craft communities.'
    when 'siem-reap' then 'Build around Angkor Wat, Angkor Thom and Bayon, Ta Prohm, Banteay Srei, Preah Khan, Phnom Bakheng, Srah Srang, Tonlé Sap communities, markets and craft villages.'
    when 'phnom-penh' then 'Core visits include the Royal Palace and Silver Pagoda, National Museum, Wat Phnom, Independence Monument, Riverfront, Tuol Sleng, Choeung Ek and major markets.'
    when 'kampot' then 'Combine Bokor National Park, Popokvil Waterfall, Teuk Chhou, Kampong Trach, Phnom K Chnor, caves, pepper farms, durian areas and the riverside town.'
    when 'kep' then 'Focus on Kep Crab Market, Koh Tonsay, Kep National Park, Phnom Sar Sear, Kep Beach and the coastal food-and-pepper experience.'
    when 'preah-sihanouk' then 'The main route is beaches and islands: Ream National Park, Otres, Independence Beach, Koh Rong, Koh Rong Sanloem, Koh Russei, Koh Puos and Kbal Chhay.'
    when 'ratanakiri' then 'Prioritise Yeak Laom Lake, Ka Chanh, Katieng and Kachang waterfalls, Virachey National Park, indigenous village routes, Banlung and gem landscapes.'
    else attractions_en
  end,
  attractions_km = case p.slug
    when 'banteay-meanchey' then 'កន្លែងសំខាន់ៗមានប្រាសាទបន្ទាយឆ្មារ អាងត្រពាំងធំ បន្ទាយនាង បន្ទាយទ័ព ភ្នំបាក់ និងភ្នំចិនជុង។'
    when 'battambang' then 'គួរផ្តោតលើក្រុងចាស់តាមស្ទឹងសង្កែ ភ្នំសំពៅ រទេះភ្លើងឫស្សី វត្តឯកភ្នំ ប្រាសាទបាណន់ ប្រាសាទបាសែត សេកសក និងបឹងកំពីងពួយ។'
    when 'kampong-cham' then 'កន្លែងសំខាន់រួមមាន វត្តនគរបាជ័យ ភ្នំហាន់ជ័យ ភ្នំប្រូស-ភ្នំស្រី ព្រៃនគរមុន កំពង់ផែមាត់ទន្លេ ព្រះរាជដំណាក់ និងបន្ទាយព្រៃនគរ។'
    when 'kampong-chhnang' then 'ស្គាល់សិប្បកម្មភូមិអណ្ដូងរូស្សី តំបន់ភូមិបណ្ដែតទឹកទន្លេសាប ភ្នំអ្នកនាងកង្រី ភ្នំក្រង់ដៃមាស និងក្រុងមាត់ទន្លេ។'
    when 'kampong-speu' then 'ផ្លូវសំខាន់រួមមានឧទ្យានជាតិគិរីរម្យ ផ្លូវទៅភ្នំឱរ៉ាល់ ទឹកក្តៅតេតឹកពុស ភ្នំប្រីយខ្មែរ និងទេសភាពស្ករត្នោតជនបទ។'
    when 'kampong-thom' then 'គួរផ្តោតលើសំបូរព្រៃគុក ភ្នំសន្ទុក ប្រាសាទអណ្តែត ប្រាសាទកុករគារ ប្រាសាទគុហាគោកណោករ និងតំបន់ចម្លាក់ថ្ម។'
    when 'kandal' then 'គួរផ្តោតលើភ្នំឧដុង្គ កោះដាច់និងមជ្ឈមណ្ឌលសិប្បកម្ម ភ្នំប្រសិទ្ធិ វត្តគៀនស្វាយក្រៅ វត្តអង្គរកេីយ ភ្នំអេដ្ឋារ៉ូស ភ្នំស្អាង និងវត្តភ្នំថ្មម៉ុន។'
    when 'koh-kong' then 'កន្លែងសំខាន់មានព្រៃកោងកាង ទឹកធ្លាក់តាតៃ កោះមូល ឆ្នេរឡាំដា ទឹកធ្លាក់ក្បាលឆាយព្រែកកោះ និងឆ្នេរស្នេរ។'
    when 'kratie' then 'បទពិសោធន៍សំខាន់មានអន្លង់ផ្សោតកាំពី កោះផ្តៅ ភ្នំសុពរល្កាលេ ភ្នំព្រះ វិហារសសរស្តម្ភមួយរយ កន្លែងសម្រាកកាំពី និងភ្នំសំបុក។'
    when 'mondulkiri' then 'គួរទៅទឹកធ្លាក់ប៊ូស្រា ជ្រៃធំ ទេសភាព Sea Forest ជម្រកដំរីដែលមិនមានការជិះ សហគមន៍ប៊ុនុង ដាក់ដាំ និងទឹកធ្លាក់ព្រៃជុំវិញ។'
    when 'preah-vihear' then 'ផ្លូវបេតិកភណ្ឌសំខាន់រួមមានប្រាសាទព្រះវិហារ កោះកេរ និងទេសភាពប្រាសាទភាគខាងជើងជាមួយជនបទភ្នំ។'
    when 'prey-veng' then 'កន្លែងសំខាន់រួមមានបាភ្នំ នគរភ្នំ វិហារចាន់ ប្រាសាទចុងស្រុក បារាយណ៍អណ្ដែត វាលប្រាង និងទេសភាពមេគង្គជនបទ។'
    when 'pursat' then 'គួរទៅភូមិបណ្ដែតកំពង់ហ្លួង សិក្ខាសាលាចម្លាក់ថ្មម៉ាប វាលវែង ជ្រលងអារ៉ែង ទឹកជំនន់បាក់ត្រា និងទេសភាពក្រវាញភាគខាងជើង។'
    when 'stung-treng' then 'កន្លែងសំខាន់មានតំបន់រ៉ាមសារស្ទឹងត្រែង ទឹកធ្លាក់សុភ័ក្ត្រមិថ្រ កោះតាមមេគង្គ អូរពងមូន កន្ទុយគោ និងផ្លូវមើលសត្វស្លាប ផ្សោត ជិះទូកកាយ៉ាក់។'
    when 'svay-rieng' then 'កន្លែងសំខាន់មានព្រៃបាសាក់ តំបន់ព្រំដែនបាវិត ទេសភាពទន្លេវៃគោ ប្រាសាទជា ហាវ និងប្រាសាទបាសាក់។'
    when 'takeo' then 'គួរផ្តោតលើភ្នំជីសូរ អង្គរបូរី ភ្នំដា តំបន់ទន្លេបាទី តាព្រហ្ម យាយពៅ នាងខ្មៅ តំបន់តាម៉ៅ និងភូមិត្បាញសូត្រ-ក្រមា។'
    when 'oddar-meanchey' then 'គួរស្គាល់តំបន់ប្រវត្តិសាស្ត្រអន្លង់វែង ផ្ទះតាម៉ុក ជួរភ្នំដងរែក ទឹកធ្លាក់ចំប៉ី និងតំបន់បេតិកភណ្ឌភាគខាងជើង។'
    when 'pailin' then 'កន្លែងសំខាន់មានភ្នំយ៉ាត វត្តរតនសោភ័ណ ទឹកធ្លាក់អូរតាវ៉ៅ ភ្នំគួយ ភ្នំកៅអៃ និងទេសភាពត្បូងដែលមានប្រវត្តិ។'
    when 'tboung-khmum' then 'គួរស្វែងយល់អំពីរង្វង់ដីបុរាណមេមត់ ចម្ការកៅស៊ូជូប ជីវិតតាមមេគង្គ វត្តព្រះធាតុថ្មដា និងសហគមន៍សិប្បកម្មជនបទ។'
    when 'siem-reap' then 'រៀបចំជុំវិញអង្គរវត្ត អង្គរធំ និងបាយ័ន តាព្រហ្ម បន្ទាយស្រី ព្រះខ័ន ភ្នំបាខែង ស្រះស្រង់ ទន្លេសាប ផ្សារនិងសហគមន៍សិប្បកម្ម។'
    when 'phnom-penh' then 'កន្លែងសំខាន់រួមមានព្រះបរមរាជវាំងនិងវត្តប្រាក់ សារមន្ទីរជាតិ វត្តភ្នំ វិមានឯករាជ្យ មាត់ទន្លេ ទួលស្លែង ជើងឯក និងផ្សារសំខាន់ៗ។'
    when 'kampot' then 'បញ្ចូលឧទ្យានជាតិបូកគោ ទឹកធ្លាក់ពពកវិល តឹកជូរ កំពង់ត្រាច ភ្នំកច្នរ រូងភ្នំ ចម្ការម្រេច និងក្រុងមាត់ស្ទឹង។'
    when 'kep' then 'ផ្តោតលើផ្សារក្តាមកែប កោះទន្សាយ ឧទ្យានជាតិកែប ភ្នំសរសៀរ ឆ្នេរកែប និងបទពិសោធន៍អាហារសមុទ្រ-ម្រេច។'
    when 'preah-sihanouk' then 'ផ្លូវទេសចរណ៍សំខាន់គឺឆ្នេរ និងកោះ៖ ឧទ្យានជាតិរាម អូត្រេស ឆ្នេរឯករាជ្យ កោះរ៉ុង កោះរ៉ុងសន្លឹម កោះរុស្សី កោះពស់ និងទឹកធ្លាក់ក្បាលឆាយ។'
    when 'ratanakiri' then 'គួរទៅបឹងយក្សឡោម ទឹកធ្លាក់កាចាញ កាទៀង កាចាញ អូរអង្គាល់ ឧទ្យានជាតិវីរៈជ័យ សហគមន៍ជនជាតិដើម បាន់លុង និងតំបន់ត្បូង។'
    else attractions_km
  end,
  updated_at = now()
from public.provinces p
where g.province_id = p.id;

insert into public.place_guides (
  place_id, about_km, about_en, history_km, history_en,
  highlights_km, highlights_en, visit_plan_km, visit_plan_en,
  tips_km, tips_en, source_urls
)
select
  p.id,
  coalesce(pg.about_km, p.summary_km || ' តំបន់នេះសមស្របសម្រាប់អ្នកចង់ស្គាល់ទេសចរណ៍ និងបរិបទមូលដ្ឋានរបស់ខេត្ត។'),
  coalesce(pg.about_en, p.summary_en || ' It adds useful context to a wider trip through ' || pr.name_en || '.'),
  coalesce(pg.history_km,
    case p.category
      when 'history' then 'ទីតាំងនេះមានតម្លៃខាងប្រវត្តិសាស្ត្រ និងបេតិកភណ្ឌ ហើយគួរអានបរិបទរបស់តំបន់មុនទស្សនា។'
      when 'culture' then 'ទីតាំងនេះឆ្លុះបញ្ចាំងវប្បធម៌ ជីវិតសហគមន៍ ឬបេតិកភណ្ឌរស់នៅរបស់តំបន់។'
      else 'ប្រវត្តិរបស់ទីតាំងនេះភ្ជាប់ជាមួយទេសភាព និងការរស់នៅរបស់សហគមន៍ក្នុងខេត្ត។'
    end),
  coalesce(pg.history_en,
    case p.category
      when 'history' then p.name_en || ' is best understood in the wider historical landscape of ' || pr.name_en || '. Its value is not only the structure itself but also the context of the surrounding heritage.'
      when 'culture' then p.name_en || ' reflects part of the living cultural landscape of ' || pr.name_en || ', where local communities, traditions and place shape the visitor experience.'
      else p.name_en || ' sits within the natural and community landscape of ' || pr.name_en || ', linking the attraction to the wider character of the province.'
    end),
  coalesce(pg.highlights_km, p.summary_km),
  coalesce(pg.highlights_en, p.summary_en),
  coalesce(pg.visit_plan_km,
    case p.listing_type
      when 'accommodation' then 'បញ្ជាក់ទីតាំង បន្ទប់ និងលក្ខខណ្ឌបច្ចុប្បន្នមុនកក់។'
      when 'restaurant' then 'ពិនិត្យម៉ោងបើក និងមុខម្ហូបបច្ចុប្បន្ន ហើយសួរតម្លៃមុនកុម្ម៉ង់។'
      else 'បញ្ចូលទីតាំងនេះក្នុងផែនការដំណើរតាមពេលវេលា និងទីតាំងជិតខាង ហើយបញ្ជាក់ព័ត៌មានបច្ចុប្បន្នមុនចេញដំណើរ។'
    end),
  coalesce(pg.visit_plan_en,
    case p.listing_type
      when 'accommodation' then 'Confirm current room availability, location, facilities and booking conditions before committing.'
      when 'restaurant' then 'Check current opening arrangements and menu options, and ask clearly about prices before ordering.'
      else 'Plan this stop together with nearby places in the same area, and confirm current access and opening arrangements before travelling.'
    end),
  coalesce(pg.tips_km,
    case p.category
      when 'nature' then 'គោរពបរិស្ថាន មិនចោលសំរាម និងអនុវត្តតាមផ្លូវឬសេចក្តីណែនាំសុវត្ថិភាព។'
      when 'history' then 'ស្លៀកពាក់សមរម្យ គោរពទីសក្ការៈ និងកុំប៉ះ ឬឡើងលើសំណង់ការពារ។'
      when 'culture' then 'គោរពសហគមន៍ និងសួរអនុញ្ញាតមុនថតរូបមនុស្ស ឬចូលតំបន់ជាក់លាក់។'
      else 'បញ្ជាក់ព័ត៌មានបច្ចុប្បន្នពីអ្នកផ្តល់សេវាដោយផ្ទាល់មុនទៅ។'
    end),
  coalesce(pg.tips_en,
    case p.category
      when 'nature' then 'Respect the environment, stay on permitted routes, and follow current local safety guidance.'
      when 'history' then 'Dress respectfully, follow heritage-site rules, and do not climb or touch protected structures.'
      when 'culture' then 'Respect local communities and ask before photographing people or entering community spaces.'
      else 'Verify current details directly with the operator before travelling.'
    end),
  case
    when jsonb_array_length(coalesce(pg.source_urls, '[]'::jsonb)) > 0 then pg.source_urls
    else jsonb_build_array(
      'https://www.tourismcambodia.org/provinces/' ||
      case pr.slug
        when 'banteay-meanchey' then '67/banteay-meanchey'
        when 'battambang' then '58/battambang'
        when 'kampong-cham' then '59/kampong-cham'
        when 'kampong-chhnang' then '60/kampong-chhnang'
        when 'kampong-speu' then '61/kampong-speu'
        when 'kampong-thom' then '55/kampong-thom'
        when 'kandal' then '56/kandal'
        when 'koh-kong' then '54/koh-kong'
        when 'kratie' then '50/kratie'
        when 'mondulkiri' then '46/mondulkiri'
        when 'preah-vihear' then '51/preah-vihear'
        when 'prey-veng' then '65/prey-veng'
        when 'pursat' then '62/pursat'
        when 'stung-treng' then '49/stung-treng'
        when 'svay-rieng' then '66/svay-rieng'
        when 'takeo' then '57/takeo'
        when 'oddar-meanchey' then '63/oddar-meanchey'
        when 'pailin' then '64/pailin'
        when 'tboung-khmum' then '245/tbong-khmum'
        when 'siem-reap' then '47/siem-reap'
        when 'phnom-penh' then '44/phnom-penh-capital-city'
        when 'kampot' then '52/kampot'
        when 'kep' then '53/kep'
        when 'preah-sihanouk' then '48/preah-sihanouk'
        when 'ratanakiri' then '45/rattanakiri'
        else '44/phnom-penh-capital-city'
      end,
      'https://en.wikipedia.org/wiki/' || replace(pr.name_en, ' ', '_')
    )
  end
from public.places p
join public.provinces pr on pr.id=p.province_id
left join public.place_guides pg on pg.place_id=p.id
on conflict (place_id) do update set
  about_km = coalesce(public.place_guides.about_km, excluded.about_km),
  about_en = coalesce(public.place_guides.about_en, excluded.about_en),
  history_km = coalesce(public.place_guides.history_km, excluded.history_km),
  history_en = coalesce(public.place_guides.history_en, excluded.history_en),
  highlights_km = coalesce(public.place_guides.highlights_km, excluded.highlights_km),
  highlights_en = coalesce(public.place_guides.highlights_en, excluded.highlights_en),
  visit_plan_km = coalesce(public.place_guides.visit_plan_km, excluded.visit_plan_km),
  visit_plan_en = coalesce(public.place_guides.visit_plan_en, excluded.visit_plan_en),
  tips_km = coalesce(public.place_guides.tips_km, excluded.tips_km),
  tips_en = coalesce(public.place_guides.tips_en, excluded.tips_en),
  source_urls = case
    when jsonb_array_length(coalesce(public.place_guides.source_urls, '[]'::jsonb)) = 0 then excluded.source_urls
    else public.place_guides.source_urls
  end,
  updated_at = now();
