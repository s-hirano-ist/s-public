import { SITE } from "@config";

interface Props {
  description: string;
}
export const OgImage = ({ description }: Props) => {
  return (
    <div
      style={{
        background: "#fefbfb",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          border: "4px solid #000",
          background: "#fefbfb",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          width: "90%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "16px",
            width: "100%",
          }}
        >
          <p
            style={{
              marginTop: "100px",
              fontSize: 64,
              fontWeight: "bold",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
              marginRight: "32px",
              marginLeft: "32px",
              fontSize: 24,
            }}
          >
            <span style={{ overflow: "hidden" }}>{`@ ${SITE.author}`}</span>
            <span style={{ overflow: "hidden" }}>{SITE.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
