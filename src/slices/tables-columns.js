 

export default {
  shipProperties: [
    { key: 'key', value: 'Наименование' },
    { key: 'value', value: 'Значение' },
  ],
  bankGuarantees: [
    { key: 'amount', value: 'Сумма' },
    { key: 'date', value: 'Дата' },
    { key: 'number', value: 'Номер' },
    { key: 'validity', value: 'Срок\nдействия' },
    { key: 'issued_by', value: 'Кто выдал' },
    { key: 'last_modified_date', value: 'Дата\nпоследнего\nизменения' },
    { key: 'note', value: 'Примечание' },
  ],

  contractObjects: [
    { key: 'building_number', value: 'Строительный\nномер' },
    { key: 'name', value: 'Название' },
    { key: 'contract_name', value: 'Название контракта' },
    { key: 'delivery_port', value: 'Порт поставки' },
    { key: 'registration_port', value: 'Порт регистрации' },
    { key: 'price', value: 'Стоимость' },
    { key: 'note', value: 'Примечание' }
  ],
  paymentStages: [
    { key: 'name', value: 'Наименование этапа' },
    { key: 'amount', value: 'Стоимость этапа' },
    { key: 'start_date', value: 'Дата начала' },
    { key: 'expiration_date_planned', value: 'Дата\nокончания\n(план)' },
    { key: 'expiration_date_real', value: 'Дата\nокончания\n(факт)' },
    { key: 'rationale', value: 'Обоснование' },
    { key: 'note', value: 'Примечание' }
  ],
  keyEvents: [
    { key: 'name', value: 'Наименование события' },
    { key: 'responsible', value: 'Ответственный' },
    { key: 'start_date', value: 'Дата начала' },
    { key: 'expiration_date_planned', value: 'Дата\nокончания\n(план)' },
    { key: 'expiration_date_real', value: 'Дата\nокончания\n(факт)' },
    { key: 'rationale', value: 'Обоснование' },
    { key: 'note', value: 'Примечание' }
  ],
  claimWorks: [
    { key: 'date', value: 'Дата'},
    { key: 'number', value: 'Номер требования'},
    { key: 'cause', value: 'Причина выставления требования'},
    { key: 'amount', value: 'Сумма требования'},
    { key: 'status', value: 'Статус исполнителя требования'}
  ],
  judicialWorks: [
    { key: 'statement_claim_date', value: 'Дата' },
    { key: 'statement_claim_number', value: 'Номер' },
    { key: 'statement_claim_name', value: 'Наименование искового требования' },
    { key: 'court_case_number', value: 'Номер\nсудебного\nдела' },
    { key: 'plaintiff', value: 'Истец' },
    { key: 'defendant', value: 'Ответчик' },
    { key: 'third_parties', value: 'Третьи лица' },
    { key: 'matter_dispute', value: 'Предмет спора' },
    { key: 'court_hearing_date', value: 'Дата судебного\nзаседания' },
    { key: 'statement_claim_status', value: 'Стадия рассмотрения искового заявления' },
    { key: 'statement_claim_result', value: 'Результат рассмотрения искового заявления' }
  ],
  cashExecutions: [
    { key: 'stage_name', value: 'Наименование этапа/аванс' },
    { key: 'price', value: 'Стоимость этапа' },
    { key: 'amount_paid', value: 'Оплачиваемая сумма' },
    { key: 'payment_date_planned', value: 'Дата оплаты\n(план)' },
    { key: 'payment_date', value: 'Дата оплаты' },
    { key: 'note', value: 'Примечание' }
  ],

  //данные приходят в виде массива а не объекта!
  limitBudgetaryObligations: [

  ],
  
  familiarization: [

  ]

};
