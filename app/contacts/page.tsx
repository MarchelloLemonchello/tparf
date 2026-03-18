// app/contacts/page.tsx
export default function ContactsPage() {
    return (
        <main className="container mx-auto px-4 pt-8">
            <h1 className="text-3xl font-bold mb-6">Контакты</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Контактная информация */}
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold">Телефоны:</h2>
                            <a
                                href="tel:+79607957523"
                                className="block text-blue-600 hover:underline"
                            >
                                +7 (960) 795-75-23
                            </a>
                            <a
                                href="tel:+79618722751"
                                className="block text-blue-600 hover:underline"
                            >
                                +7 (961) 872-27-51
                            </a>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Email:</h2>
                            <a
                                href="mailto:tpa@tparf.ru"
                                className="text-blue-600 hover:underline"
                            >
                                tpa@tparf.ru
                            </a>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Адрес:</h2>
                            <p>
                                630132, Новосибирская область, город Новосибирск, Нарымская ул.,
                                д. 9, кв. 89
                            </p>
                        </div>
                    </div>

                    {/* Карта */}
                    <div className="h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A4de50e0f399cba2415a698dac6c4f932dafee80bdb992cbdd8bff764c318ebad&amp;source=constructor"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen={true}
                            style={{ position: 'relative' }}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}