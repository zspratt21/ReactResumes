export default function Email({email}: {email: string}) {
    return (
        !!email && (
            <a href={`mailto:${email}`}>
                <h3>
                    <i className="fa-solid fa-envelope text-[sandybrown]"></i> {email}
                </h3>
            </a>
        )
    );
}
