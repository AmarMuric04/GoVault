/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "./marquee";

const reviews = [
  {
    name: "Alice",
    username: "@secureAlice",
    body: "This password manager is a lifesaver. I never have to worry about forgetting a password again.",
    img: "https://avatar.vercel.sh/alice",
  },
  {
    name: "Bob",
    username: "@encryptionBob",
    body: "The encryption is top-notch, and the interface is super user-friendly. 10/10.",
    img: "https://avatar.vercel.sh/bob",
  },
  {
    name: "Charlie",
    username: "@cyberCharlie",
    body: "Finally, a password manager I can trust. Breach alerts and strong password generation are a must-have.",
    img: "https://avatar.vercel.sh/charlie",
  },
  {
    name: "Dana",
    username: "@digitalDana",
    body: "I love the seamless syncing across all my devices. I feel much more secure now.",
    img: "https://avatar.vercel.sh/dana",
  },
  {
    name: "Eve",
    username: "@encryptedEve",
    body: "This app is the perfect combination of security and ease of use. I can't imagine going back.",
    img: "https://avatar.vercel.sh/eve",
  },
  {
    name: "Frank",
    username: "@fortifiedFrank",
    body: "Managing team credentials has never been this easy. A must-have for any business.",
    img: "https://avatar.vercel.sh/frank",
  },
  {
    name: "Grace",
    username: "@guardianGrace",
    body: "Password breach alerts saved me from a major headache. Highly recommend.",
    img: "https://avatar.vercel.sh/grace",
  },
  {
    name: "Hank",
    username: "@hardenedHank",
    body: "Love the password generator. It's a real time-saver and keeps my accounts secure.",
    img: "https://avatar.vercel.sh/hank",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
const thirdRow = reviews.slice(0, reviews.length / 2);
const fourthRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit sm:w-36 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Marquee3D() {
  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {thirdRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {fourthRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
