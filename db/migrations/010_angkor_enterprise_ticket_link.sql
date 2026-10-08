USE cambodia_tourism;

UPDATE places
SET ticket_url = 'https://www.angkorenterprise.gov.kh/en',
    ticket_provider = 'Angkor Enterprise'
WHERE slug = 'angkor-wat';
