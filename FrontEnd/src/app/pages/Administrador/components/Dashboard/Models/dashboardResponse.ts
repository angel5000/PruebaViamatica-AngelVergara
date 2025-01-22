export interface Dashboardresponse {
    idUsuario: number
    userName: string
    sesionActive: string
    statusUsuario: string
    fechaIngreso: string
    fechaCierre: Date
    sesionExitosa: string
    sesionFallida: string
    badgeColor:string
    badgeColor2:string
    badgeColor3:string
    badgeColor4:string
    badgeColor5:string
}
export interface DashboardCount {
    totalUsuarios: number
    totalSesionActiva: number
    totalBloqueados: number
}