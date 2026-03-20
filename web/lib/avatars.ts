export const DEFAULT_AVATARS = [
  {
    url: "https://i.pinimg.com/474x/d4/45/39/d445395378d16ff73746ae89e2e5350c.jpg",
    label: "Shinobi",
  },
  {
    url: "https://static.vecteezy.com/system/resources/previews/011/484/425/non_2x/anime-boy-avatar-isolated-vector.jpg",
    label: "Blue",
  },
  {
    url: "https://avatarfiles.alphacoders.com/334/thumb-1920-334047.jpg",
    label: "Glow",
  },
  {
    url: "https://i.pinimg.com/736x/0a/13/ac/0a13ac7c53bf8f78918588abf1b371c7.jpg",
    label: "Red Eye",
  },
  {
    url: "https://mooddp.com/wp-content/uploads/2025/12/best-anime-avatar.jpg",
    label: "Moon",
  },
  {
    url: "https://mooddp.com/wp-content/uploads/2025/12/popular-anime-dp.jpg",
    label: "Night",
  },
  {
    url: "https://gayfriendly.com/wp-content/uploads/2022/03/Kobato-Hasegawa-853x630.png.webp",
    label: "Sakura",
  },
];

export function getRandomAvatar(): string {
  return DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)].url;
}
