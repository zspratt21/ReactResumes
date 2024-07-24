export default function Mobile({mobile}: {mobile: string}) {
    return (
        !!mobile && (
                <a href={`tel:${mobile}`}>
                    <h3>
                        <i className="fa-solid fa-phone-volume text-[limegreen]"></i> {mobile}
                    </h3>
                </a>
            )
    );
}
