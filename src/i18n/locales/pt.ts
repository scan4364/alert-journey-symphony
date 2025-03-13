import { AlertType, AlertPriority, AlertStatus } from '@/utils/alertTypes';

export const pt = {
  common: {
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    save: 'Salvar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Excluir',
    filters: 'Filtros',
    applyFilters: 'Aplicar Filtros',
    resetFilters: 'Limpar Filtros',
		readMore: 'Ler mais',
  },
  components: {
    statusBadge: {
      active: 'Ativo',
      acknowledged: 'Reconhecido',
      resolved: 'Resolvido',
      expired: 'Expirado',
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa',
      info: 'Informação',
      'route-deviation': 'Desvio de Rota',
      'weather-condition': 'Condição Climática',
      'mechanical-issue': 'Problema Mecânico',
      'traffic-congestion': 'Congestionamento',
      'security-breach': 'Violação de Segurança',
      'schedule-change': 'Mudança de Horário',
      'fuel-status': 'Nível de Combustível',
      'system-notification': 'Notificação do Sistema',
    },
    sidebar: {
      dashboard: 'Painel',
      alerts: 'Alertas',
      configuration: 'Configuração',
      userManagement: 'Gerenciamento de Usuários',
      logout: 'Sair',
    },
  },
  pages: {
    dashboard: {
      title: 'Painel de Controle',
      subtitle: 'Visão geral do sistema',
      totalAlerts: 'Alertas Totais',
      activeAlerts: 'Alertas Ativos',
      acknowledgedAlerts: 'Alertas Reconhecidos',
      resolvedAlerts: 'Alertas Resolvidos',
      alertsByType: 'Alertas por Tipo',
      alertsByPriority: 'Alertas por Prioridade',
    },
    alerts: {
      title: 'Alertas',
      subtitle: 'Gerenciar alertas do sistema',
      priority: 'Prioridade',
      status: 'Status',
      type: 'Tipo',
      all: 'Todos',
      active: 'Ativo',
      acknowledged: 'Reconhecido',
      resolved: 'Resolvido',
      expired: 'Expirado',
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa',
      info: 'Informação',
      'route-deviation': 'Desvio de Rota',
      'weather-condition': 'Condição Climática',
      'mechanical-issue': 'Problema Mecânico',
      'traffic-congestion': 'Congestionamento',
      'security-breach': 'Violação de Segurança',
      'schedule-change': 'Mudança de Horário',
      'fuel-status': 'Nível de Combustível',
      'system-notification': 'Notificação do Sistema',
      noAlerts: 'Nenhum alerta encontrado.',
    },
    configuration: {
      title: 'Configuração',
      subtitle: 'Configurações do sistema e preferências do usuário',
    },
    userManagement: {
      title: 'Gerenciamento de Usuários',
      subtitle: 'Gerenciar usuários e permissões do sistema',
    },
    notFound: {
      title: 'Página não encontrada',
      subtitle: 'A página que você está procurando não existe.',
      returnHome: 'Voltar para a página inicial',
    },
  },
  alerts: {
    acknowledge: 'Reconhecer',
    markResolved: 'Marcar como Resolvido',
    deleteAlert: 'Excluir Alerta',
  },
  driver: {
    preview: {
      title: "Visualização do Motorista",
      description: "Este é um exemplo de como os alertas aparecerão no aplicativo do motorista.",
      alertTitle: "Visualização do Smartphone",
      alertDescription: "Esta visualização simula como os alertas são exibidos no aplicativo móvel do motorista."
    },
    mobileApp: {
      title: "FleetAlert Motorista",
      subtitle: "Alertas prioritários",
      alertsHeading: "Alertas Ativos",
      alertsDescription: "Alertas que requerem sua atenção"
    },
    alertExample: {
      title: "Desvio de Rota Detectado",
      description: "Você está 2.5km fora da rota planejada. Atraso estimado: 15 minutos."
    },
    actions: {
      viewMap: "Ver Mapa",
      acknowledge: "Confirmar"
    },
    nav: {
      alerts: "Alertas",
      routes: "Rotas",
      profile: "Perfil"
    }
  },
};
