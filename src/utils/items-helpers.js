export const groupCollectedItems = (collectedItems) => {
  let grouped = {};
  if (!collectedItems || collectedItems?.length === 0) return grouped;

  collectedItems.forEach((item) => {
    if (!item?.id) return;

    if (!grouped[item.id]) {
      grouped[item.id] = { ...item, level: 0 };
    }

    grouped[item.id].level++;
  });

  return grouped;
};
