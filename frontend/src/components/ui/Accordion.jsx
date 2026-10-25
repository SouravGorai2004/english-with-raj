export default function Accordion({ items }) {
    if (!items || items.length === 0) return null;
    return (
        <div className="accordion">
            {items.map((item, i) => (
                <details key={i}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                </details>
            ))}
        </div>
    );
}