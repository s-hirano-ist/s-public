import { SITE } from "@config";

type Props = {
  description: string;
};
export const OgImage = ({ description }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        background: "linear-gradient(#4f697b, #2a353d)",
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          width: "90%",
          height: "80%",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "16px",
            width: "100%",
          }}>
          <p
            style={{
              marginTop: "100px",
              fontSize: 48,
              fontWeight: "bold",
              marginLeft: "32px",
              overflow: "hidden",
            }}>
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
            }}>
            <span style={{ overflow: "hidden" }}>
              <a href="https://s-hirano.com">https://s-hirano.com</a>
            </span>
            <span style={{ overflow: "hidden" }}>
              {SITE.title} by @ {SITE.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
