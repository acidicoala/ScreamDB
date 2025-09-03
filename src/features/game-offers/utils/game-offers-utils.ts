import { type KeyImage, KeyImageType } from "~/core/gql/graphql.ts";

export function gameOffersUtils(keyImages: KeyImage[]): KeyImage | undefined {
  const matchOrder = [
    KeyImageType.OfferImageWide,
    KeyImageType.DieselStoreFrontWide,
    KeyImageType.Thumbnail,
    KeyImageType.OfferImageTall,
    KeyImageType.DieselStoreFrontTall,
    KeyImageType.CodeRedemption_340x440,
  ];

  for (const matchType of matchOrder) {
    const keyImage = keyImages.find((image) => image.type === matchType);

    if (keyImage) {
      return keyImage;
    }
  }

  return undefined;
}
