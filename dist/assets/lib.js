export function getDisclosure(asset) { return asset.kind === 'illustrative' ? 'Ilustrační fotografie — nejde o doloženou realizaci BAUREKO.' : null; }
export function filterCapabilities(items, id) { return id === 'all' ? [...items] : items.filter(item => item.id === id); }
export function validateEnquiry(data) { const e = {}; if (!data.organisation)
    e.organisation = 'Uveďte organizaci.'; if (!data.contact)
    e.contact = 'Uveďte kontaktní osobu.'; if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email))
    e.email = 'Uveďte platný e-mail.'; if (!data.phone || data.phone.replace(/\D/g, '').length < 9)
    e.phone = 'Uveďte platný telefon.'; if (!data.projectType)
    e.projectType = 'Vyberte typ poptávky.'; if (!data.message || data.message.trim().length < 15)
    e.message = 'Popište rozsah zadání podrobněji.'; return e; }
