import React from 'react';
import Calculator from '.';

export default {
  title: 'Widgets/BuyersGuide/Calculator',
};

export const Default = () => (
  <Calculator
    data={{
      title: 'Volumen-Rechner',
      subtitle: 'Wie viel Surfboard-Volumen für mein Surf Level?',
      labels: {
        level: 'Wähle dein Surf Level',
        weight: 'Gib dein Körpergewicht in kg ein',
        result: 'Dein empfohlenes Surfboard Volumen',
      },
      resultUnit: 'Liter',
      options: [
        {
          title: 'Ich bin noch nie gesurft',
          startRange: 0.8,
          endRange: 1.2,
        },
        {
          title: 'Ich kann Weißwasser-Takeoffs',
          startRange: 1.2,
          endRange: 1.5,
        },
        {
          title: 'Ich surfe erste grüne Wellen',
          startRange: 1.5,
          endRange: 1.8,
        },
        {
          title: 'Ich verbessere meine Turns',
          startRange: 1.8,
          endRange: 2.1,
        },
        {
          title: 'Ich beherrsche Cutbacks und Floaters',
          startRange: 2.1,
          endRange: 2.5,
        },
        {
          title: 'Ich liebe Barrels und Aerials',
          startRange: 2.5,
          endRange: 3,
        },
      ],
    }}
  />
);
