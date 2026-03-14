export const getEasterEggSequence = (lang: 'pt' | 'en'): string[] =>
  lang === 'pt'
    ? [
      'Acesso root solicitado...',
      'Verificando credenciais... [OK]',
      'sudo -i executado com sucesso.',
      '',
      '██████████████████████████████████████',
      '█                                    █',
      '█   🚀  MODO DEUS ATIVADO  🚀        █',
      '█                                    █',
      '█   Olá, explorador curioso!         █',
      '█   Você encontrou o easter egg!     █',
      '█                                    █',
      '█   Fato secreto: este portfólio     █',
      '█   foi construído com café ☕,      █',
      '█   bugs 🐛 e muito typescript.      █',
      '█                                    █',
      '█   Obrigado por explorar! ;)        █',
      '██████████████████████████████████████',
      '',
      '[easterEgg@portfolio ~]# logout',
      'Retornando ao modo normal...',
    ]
    : [
      'Requesting root access...',
      'Verifying credentials... [OK]',
      'sudo -i executed successfully.',
      '',
      '██████████████████████████████████████',
      '█                                    █',
      '█   🚀  GOD MODE ACTIVATED  🚀       █',
      '█                                    █',
      '█   Hello, curious explorer!         █',
      '█   You found the easter egg!        █',
      '█                                    █',
      '█   Secret fact: this portfolio      █',
      '█   was built with coffee ☕,        █',
      '█   bugs 🐛 and lots of typescript. █',
      '█                                    █',
      '█   Thanks for exploring! ;)         █',
      '██████████████████████████████████████',
      '',
      '[easterEgg@portfolio ~]# logout',
      'Returning to normal mode...',
    ];

export const getHelpLines = (lang: 'pt' | 'en'): string[] =>
  lang === 'pt'
    ? [
      'Comandos disponíveis:',
      '  y           → Carregar interface gráfica',
      '  n           → Cancelar',
      '  more info   → Ver pergunta novamente',
      '  help        → Mostrar esta ajuda',
      '  clear       → Limpar terminal',
      '  easter egg   → O Easter Egg está escondido...',
    ]
    : [
      'Available commands:',
      '  y           → Load graphical interface',
      '  n           → Cancel',
      '  more info   → Show question again',
      '  help        → Show this help',
      '  clear       → Clear terminal',
      '  easter egg   → The Easter Egg is hidden...',
    ];
