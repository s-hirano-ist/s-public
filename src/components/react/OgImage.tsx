import { SITE } from "@config";

type Props = {
  description: string;
};
// s-ui design tokens (Satori does not support CSS vars)
// primary: rgb(64, 118, 162) = #4076a2
// accent: rgb(147, 97, 204) = #9361cc
const OG_PRIMARY = "#4076a2";
const OG_PRIMARY_DARK = "#2d4a6b";
const OG_ACCENT = "#9361cc";
const OG_BG = `linear-gradient(135deg, ${OG_PRIMARY_DARK} 0%, ${OG_PRIMARY} 40%, ${OG_ACCENT} 100%)`;
const OG_TEXT = "#ffffff";

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
        color: OG_TEXT,
        background: OG_BG,
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
