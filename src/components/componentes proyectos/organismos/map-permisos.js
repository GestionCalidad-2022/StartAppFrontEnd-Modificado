export const ROLES = {
    coreTeam: "core team",
    lider: "lider",
    voluntario: "voluntario"
};

export const SCOPES = {
    canCrudProyectos: "can-crud-proyectos",
    canNotCrudProyectos: "can-not-crud-proyectos",
    canCrudEventos: "can-crud-eventos",
    canView: "can-view",
    canParticipate: "can-participate"
};

export const PERMISSIONS = {
    [ROLES.voluntario]: [SCOPES.canView, SCOPES.canParticipate, SCOPES.canNotCrudProyectos],
    [ROLES.lider]: [SCOPES.canView, SCOPES.canCrudEventos, SCOPES.canNotCrudProyectos],
    [ROLES.coreTeam]: [
    SCOPES.canCrudProyectos,
    SCOPES.canCrudEventos,
    SCOPES.canView,
    SCOPES.canParticipate
    ]
};