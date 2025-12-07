import { Loader } from "@mantine/core";

export default function CenterLoader() {
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(4px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999999,
                flexDirection: "column",
            }}
        >
            <Loader
                size="md"
                radius="xl"
                color="#ff6575"  
                type="bars"
            />

            
        </div>
    );
}
