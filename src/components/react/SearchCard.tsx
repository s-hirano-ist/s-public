import { capitalizeFirstLetterOnly } from "@utils/convertString";

type Props = {
  href: string;
  title: string;
  description: string;
};

export default function SearchCard({ href, title, description }: Props) {
  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0">
        {/* TODO: what those css mean */}
        <h2 className="text-lg font-medium text-primary decoration-dashed hover:underline">
          {capitalizeFirstLetterOnly(title)}
        </h2>
      </a>
      <p>{description}</p>
    </li>
  );
}
