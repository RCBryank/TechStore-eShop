import 'react';

export function BodyWrapper({ children, URI }: ({ children: any, URI: string })) {

    document.body.classList.forEach(function (_value, _number, e) {
        document.body.classList.remove(_value);
    });

    document.body.classList.add(URI);

    return (
        <>
            {children}
        </>
    );
}