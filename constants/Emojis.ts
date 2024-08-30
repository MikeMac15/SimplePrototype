export const getEmoji = (emoji: string) => {
    switch (emoji) {
        case 'great':
            return require('@/assets/emojis/heart_eyes.json');
        case 'good':
            return require('@/assets/emojis/smile.json');
        case 'bad':
            return require('@/assets/emojis/bad.json');
            // return require('@/assets/emojis/curse.json');
        case 'putt':
            return require('@/assets/emojis/putt.json');
        case 'bandage':
            return require('@/assets/emojis/bandage.json');
        case 'green':
            return require('@/assets/emojis/green.json');
        case 'fwy':
            return require('@/assets/emojis/fwy.json');
        case 'missed_green':
            return require('@/assets/emojis/missed_green.json');
        case 'missed_fwy':
            return require('@/assets/emojis/missed_fwy.json');
        case 'stats':
            return require('@/assets/emojis/stats.json');
      }
    };