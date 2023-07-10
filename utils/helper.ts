const getLongDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getLocation = (city?: string, country?: string): string => {
  let location = "";
  if (country) {
    location = country;
    if (city) {
      location = `${city}, ${country}`;
    }
  }

  return location;
};

const getUserInitials = (name?: string): string => {
  let initials = "";

  if (name) {
    initials = name
      .split(" ")
      .map((d) => d[0])
      .join("")
      .toUpperCase();
  }
  return initials;
};

const getTrimImageName = (image: File, trimLength: number): string => {
  return image
    ? image.name.length < trimLength
      ? image.name
      : image.name.slice(0, trimLength) + "..."
    : "";
};

export { getLongDate, getLocation, getUserInitials, getTrimImageName };
