export default function Address({address}: {address: string}) {
    return (
        !!address && (
            <a href={`https://www.google.com/maps/search/?api=1&query=${address}`}>
                <h3>
                    <i className="fa-solid fa-location-dot text-[crimson]"></i> {address}
                </h3>
            </a>
        )
    );
}
