'use client';

export function ProductDescription({
                                       blocks,
                                   }: {
    blocks: { id: string; type: number; content: string; sortOrder: number }[];
}) {
    if (!blocks?.length) return null;
    const ordered = [...blocks].sort((a, b) => a.sortOrder - b.sortOrder);
    return (
        <section className="space-y-2">
            <h2 className="text-lg font-semibold">Описание</h2>
            {ordered.map((b) => (
                <p key={b.id} className="text-gray-800 leading-relaxed">
                    {b.content}
                </p>
            ))}
        </section>
    );
}
