'use client';

export function ProductCharacteristics({ data }: { data: Record<string, unknown> }) {
    const entries = Object.entries(data ?? {});
    if (!entries.length) return null;

    return (
        <section className="space-y-3">
            <h2 className="text-lg font-semibold">Характеристики</h2>
            <div className="overflow-hidden rounded border">
                <table className="w-full text-sm">
                    <tbody>
                    {entries.map(([key, val]) => (
                        <tr key={key} className="odd:bg-gray-50">
                            <td className="w-1/3 px-4 py-2 text-gray-600">{key}</td>
                            <td className="px-4 py-2">{String(val)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
