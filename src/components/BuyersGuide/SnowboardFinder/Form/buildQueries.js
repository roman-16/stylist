import { clamp } from 'lodash-es';

export default ({ gender, bodyHeight, bodyWeight, snowboardBoots, ridingLevel, ridingStyle }) => {
  let query = 'fh_location=//catalog01/de_DE/parent_categories>{00000001}/';
  let href = '/de-AT/products/categories/Snowboard+Shop-00000000--Snowboards-00000001/';
  let minLength = 0;
  let maxLength = 0;

  if (gender) {
    if (gender === 'kids') {
      query += `vc_gender_age>{boys;girls}/`;
      href += 'gender/boys--girls/';
    } else {
      query += `vc_gender_age>{${gender}}/`;
      href += `gender/${gender}/`;
    }
  }

  if (bodyHeight && gender) {
    const parsedBodyHeight = Number(bodyHeight);
    const mappedBodyHeight = {
      men: clamp(parsedBodyHeight, 165, 187),
      women: clamp(parsedBodyHeight, 159, 171),
      kids: clamp(parsedBodyHeight, 108, 162),
    }[gender];

    if (mappedBodyHeight) {
      const lengthModifiers = gender === 'kids' ? { min: -25, max: -15 } : { min: -25, max: -17 };
      const lengthModifier =
        ({
          beginner: -3,
          intermediate: -1,
          advanced: 0,
          expert: 1,
        }[ridingLevel] ?? 0) +
        ({
          jib: -3,
          freestyle: -1,
          'all-mountain': 0,
          freeride: +3,
        }[ridingStyle] ?? 0);

      minLength = mappedBodyHeight + lengthModifiers.min + lengthModifier;
      maxLength = mappedBodyHeight + lengthModifiers.max + lengthModifier;

      query += `${minLength}<c_laenge_cm<${maxLength + 1}/`;
      const rangeLength = {
        men: { min: '130.0', max: '200.0' },
        women: { min: '130.0', max: '160.0' },
        kids: { min: '80.0', max: '160.0' },
      }[gender];

      href += `c_laenge_cm/${rangeLength.min}-${minLength}.0-${maxLength}.0-${rangeLength.max}/`;
    }
  }

  if (bodyWeight && gender) {
    const parsedBodyWeight = Number(bodyWeight);
    const mappedBodyWeight = {
      men: clamp(parsedBodyWeight, 34, 140),
      women: clamp(parsedBodyWeight, 23, 91),
      kids: clamp(parsedBodyWeight, 11, 68),
    }[gender];

    if (mappedBodyWeight) {
      // + 1 because fredhopper has no lower than, so we must add 1
      query += `c_ridergewicht_min<${mappedBodyWeight}/c_ridergewicht_max>${mappedBodyWeight + 1}/`;
      // not in use because the listerpage doesn't support it
      // href += `c_ridergewicht_min/${mappedBodyWeight}/c_ridergewicht_max/${mappedBodyWeight + 1}/`;
    }
  }

  if (snowboardBoots && snowboardBoots === 'yes') {
    query += 'c_boards_skitech>{wide_board}/';
    href += 'c_boards_skitech/wide+board/';
  }

  if (ridingLevel) {
    query += `vc_riding_level>{${ridingLevel}}/`;
    href += `vc_riding_level/${ridingLevel}/`;
  }

  if (ridingStyle) {
    if (ridingStyle === 'all-mountain') {
      query += `c_ridingstyle_neu>{all_mountain}/`;
      href += 'c_ridingstyle_neu/all+mountain/';
    } else {
      query += `c_ridingstyle_neu>{${ridingStyle}}/`;
      href += `c_ridingstyle_neu/${ridingStyle}/`;
    }
  }

  return {
    query,
    href,
    minLength,
    maxLength,
  };
};
