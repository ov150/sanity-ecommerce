export const metadata = {
    title:"next with sanity",
    description: "generate by next js wiht sanity"
};


export default function RootLayout({
    children,
} : {
    children : React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}