; (function (App) {
    //var format='data:image/svg+xml;base64,';
    var icons={         // icons
        "block":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjY2MDUwNzU4MzM0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ1ODMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg1My4wMiAyNjEuMzhINzM2LjY3VjE3Ny4xQzczNi41NiA3OS40OSA2NjAuMTYgMC40IDU2NS44OSAwLjNIMTcwLjc4Qzc2LjUyIDAuNCAwLjExIDc5LjQ5IDAgMTc3LjF2NDA5LjAzYzAuMTEgOTcuNjEgNzYuNTEgMTc2LjcxIDE3MC43OSAxNzYuOGgxMTYuMzR2ODQuMjljMC4xMiA5Ny42IDc2LjUyIDE3Ni42OCAxNzAuNzggMTc2Ljc4aDM5NS4xMWM5NC4yNy0wLjExIDE3MC42Ny03OS4xOSAxNzAuNzgtMTc2Ljc5VjQzOC4xOGMtMC4xMS05Ny42MS03Ni41MS0xNzYuNy0xNzAuNzgtMTc2Ljh6IG05My4xNyA1ODUuODFjLTAuMDYgNTMuMjYtNDEuNzQgOTYuNDEtOTMuMTggOTYuNDdoLTM5NS4xYy01MS40NC0wLjA2LTkzLjEyLTQzLjIxLTkzLjE5LTk2LjQ3di04NC4yNmgyMDEuMTdjOTQuMjctMC4xIDE3MC42Ni03OS4xOSAxNzAuNzgtMTc2Ljc5VjQ2OS4yM2MwLTIyLjE4LTE3LjM3LTQwLjE3LTM4LjgtNDAuMTctMjEuNDMgMC0zOC44IDE3Ljk5LTM4LjggNDAuMTd2MTE2LjkxYy0wLjA2IDUzLjI2LTQxLjc1IDk2LjQtOTMuMTggOTYuNDZIMTcwLjc4Yy01MS40NC0wLjA2LTkzLjEyLTQzLjItOTMuMTgtOTYuNDZWMTc3LjFjMC4wNi01My4yNiA0MS43NS05Ni40MiA5My4xOC05Ni40N2gzOTUuMTFjNTEuNDQgMC4wNSA5My4xMiA0My4yMSA5My4xOCA5Ni40N3Y4NC4yOEg0NTcuOTFjLTk0LjI3IDAuMS0xNzAuNjcgNzkuMTktMTcwLjc4IDE3Ni44djExNS4zOWMwIDIyLjE4IDE3LjM3IDQwLjE3IDM4LjggNDAuMTcgMjEuNDMgMCAzOC44LTE3Ljk5IDM4LjgtNDAuMTdWNDM4LjE4YzAuMDctNTMuMjUgNDEuNzUtOTYuNCA5My4xOS05Ni40NmgzOTUuMTFjNTEuNDMgMC4wNiA5My4xMSA0My4yMSA5My4xOCA5Ni40N3Y0MDkuMDMtMC4wM3ogbTAgMCIgcC1pZD0iNDU4NCI+PC9wYXRoPjwvc3ZnPg==",
        "auth":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjY2MDUwNzM0NDUzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM1MjMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMi40OTg2ODggNTc0LjM0NzI2NGMtNjAuMjQ4MDY0IDAtMTE2LjY3ODY1Ni0yNy4yMzMyOC0xNTguODg1ODg4LTc2LjY3ODE0NC00MS4zMTQzMDQtNDguMzk3MzEyLTY0LjA2MTQ0LTExMi41MTUwNzItNjQuMDYxNDQtMTgwLjU0MzQ4OCAwLTY4LjAyODQxNiAyMi43NDcxMzYtMTMyLjE0NDEyOCA2NC4wNjE0NC0xODAuNTQyNDY0QzM5NS44MjAwMzIgODcuMTMxMTM2IDQ1Mi4yNDU1MDQgNTkuOTA0IDUxMi40OTg2ODggNTkuOTA0YzYwLjI1NjI1NiAwIDExNi42Nzk2OCAyNy4yMzMyOCAxNTguODg2OTEyIDc2LjY3MzAyNCA0MS4zMTQzMDQgNDguMzk4MzM2IDY0LjA2NzU4NCAxMTIuNTE5MTY4IDY0LjA2NzU4NCAxODAuNTQ3NTg0IDAgNjguMDI3MzkyLTIyLjc1NDMwNCAxMzIuMTQ1MTUyLTY0LjA2NzU4NCAxODAuNTQzNDg4QzYyOS4xNzkzOTIgNTQ3LjExMzk4NCA1NzIuNzU0OTQ0IDU3NC4zNDcyNjQgNTEyLjQ5ODY4OCA1NzQuMzQ3MjY0TDUxMi40OTg2ODggNTc0LjM0NzI2NHpNNTEyLjQ5ODY4OCAxMDYuMTU1MDA4Yy05Ny40Mjk1MDQgMC0xNzYuNzAyNDY0IDk0LjYzODA4LTE3Ni43MDI0NjQgMjEwLjk3MDYyNCAwIDExNi4zMzI1NDQgNzkuMjcyOTYgMjEwLjk3MTY0OCAxNzYuNzAyNDY0IDIxMC45NzE2NDggOTcuNDM1NjQ4IDAgMTc2LjcwMjQ2NC05NC42MzkxMDQgMTc2LjcwMjQ2NC0yMTAuOTcxNjQ4QzY4OS4yMDExNTIgMjAwLjc5MzA4OCA2MDkuOTM1MzYgMTA2LjE1NTAwOCA1MTIuNDk4Njg4IDEwNi4xNTUwMDhMNTEyLjQ5ODY4OCAxMDYuMTU1MDA4ek01MTIuNDk4Njg4IDEwNi4xNTUwMDgiIHAtaWQ9IjM1MjQiPjwvcGF0aD48cGF0aCBkPSJNMTE2LjQyNDcwNCA5NjQuNzI3ODA4Yy0wLjg5MjkyOC00Ljg5MzY5Ni0yMS4xMDM2MTYtMTIwLjk2NjE0NCA1OC43OTA5MTItMjE2Ljg4MzIgNjYuMzQxODg4LTc5LjYzNzUwNCAxNzkuODkzMjQ4LTEyMC4wMTk5NjggMzM3LjUwMzIzMi0xMjAuMDE5OTY4bDAgNDYuMjUzMDU2Yy03OC4xODk1NjggMC0xNDQuODExMDA4IDEwLjU5ODQtMTk4LjAwODgzMiAzMS41MDU0MDgtNDMuNDkzMzc2IDE3LjA5MDU2LTc4LjQ2NzA3MiA0MS4yNjcyLTEwMy45NTEzNiA3MS44Njk0NC02Ni4xODQxOTIgNzkuNDQ3MDQtNDkuMDIxOTUyIDE3Ny45MjgxOTItNDguODM4NjU2IDE3OC45MTczNzZMMTE2LjQyNDcwNCA5NjQuNzI3ODA4IDExNi40MjQ3MDQgOTY0LjcyNzgwOHpNMTE2LjQyNDcwNCA5NjQuNzI3ODA4IiBwLWlkPSIzNTI1Ij48L3BhdGg+PHBhdGggZD0iTTkwOC41NzM2OTYgOTY0LjcyNzgwOGwtNDUuNDg5MTUyLTguMzU4OTEyIDIyLjc0MjAxNiA0LjE3Njg5Ni0yMi43NTMyOC00LjExNjQ4YzAuMDQ0MDMyLTAuMjUyOTI4IDQuNDU4NDk2LTI1Ljc0ODQ4IDAuMzY3NjE2LTYwLjc3NDQtNS4zNTA0LTQ1Ljg2MzkzNi0yMi4wMzY0OC04NS43ODk2OTYtNDkuNTg5MjQ4LTExOC42NzQ0MzItMjUuNTI4MzItMzAuNDczMjE2LTYwLjUxNDMwNC01NC41NTE1NTItMTAzLjk3Nzk4NC03MS41NjQyODgtNTMuMTI1MTItMjAuNzk3NDQtMTE5LjYxMDM2OC0zMS4zMzk1Mi0xOTcuNTk3MTg0LTMxLjMzOTUyTDUxMi4yNzY0OCA2MjcuODI0NjRjMTU3LjYxMzA1NiAwIDI3MS4xNjQ0MTYgNDAuMzgzNDg4IDMzNy41MDUyOCAxMjAuMDE5OTY4QzkyOS42NzgzMzYgODQzLjc2MTY2NCA5MDkuNDczNzkyIDk1OS44MzQxMTIgOTA4LjU3MzY5NiA5NjQuNzI3ODA4TDkwOC41NzM2OTYgOTY0LjcyNzgwOHpNOTA4LjU3MzY5NiA5NjQuNzI3ODA4IiBwLWlkPSIzNTI2Ij48L3BhdGg+PC9zdmc+",
        "anchor":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjY2MDUwNzEzMDM0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMxOTciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc1Ni4xMzUgNTEyYTggOCAwIDAgMS02LjM2Ny0xMi44NDNsOTEuODY0LTEyMC43ODVhOCA4IDAgMCAxIDEyLjczNiAwbDkxLjg2NCAxMjAuNzg1QTggOCAwIDAgMSA5MzkuODY1IDUxMkg4ODhjMCAyMDcuNjYtMTY4LjM0IDM3Ni0zNzYgMzc2LTIwNS41ODIgMC0zNzIuNjMtMTY0Ljk5LTM3NS45NS0zNjkuNzgyTDEzNiA1MTJIODIuMTM1YTggOCAwIDAgMS02LjM2Ny0xMi44NDNsOTEuODY0LTEyMC43ODVhOCA4IDAgMCAxIDEyLjczNiAwbDkxLjg2NCAxMjAuNzg1QTggOCAwIDAgMSAyNjUuODY1IDUxMkgyMTJjMCAxNTMuNTAxIDExNS4yODcgMjgwLjA3NiAyNjMuOTk4IDI5Ny44NjJsMC4wMDEtMzkwLjM5OUM0MTMuODkxIDQwMy40NzcgMzY4IDM0Ny4wOTggMzY4IDI4MGMwLTc5LjUyOSA2NC40NzEtMTQ0IDE0NC0xNDRzMTQ0IDY0LjQ3MSAxNDQgMTQ0YzAgNjcuMDk4LTQ1Ljg5IDEyMy40NzctMTA3Ljk5OCAxMzkuNDYzbDAuMDAxIDM5MC4zOTlDNjk1LjExIDc5Mi4yNjcgODA5LjUwNyA2NjguMjIgODExLjk2IDUxNi45Nkw4MTIgNTEyaC01NS44NjV6TTUxMiAyMTJjLTM3LjU1NSAwLTY4IDMwLjQ0NS02OCA2OHMzMC40NDUgNjggNjggNjggNjgtMzAuNDQ1IDY4LTY4LTMwLjQ0NS02OC02OC02OHoiIHAtaWQ9IjMxOTgiPjwvcGF0aD48L3N2Zz4=",
        "comment":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjY0OTI3MDY1NzE4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxNjYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTE1Ny41NjggNzUxLjI5NmMtMTEuMDA4LTE4LjY4OC0xOC4yMTg2NjctMzEuMjIxMzMzLTIxLjgwMjY2Ny0zNy45MDkzMzNBNDI0Ljg4NTMzMyA0MjQuODg1MzMzIDAgMCAxIDg1LjMzMzMzMyA1MTJDODUuMzMzMzMzIDI3Ni4zNjI2NjcgMjc2LjM2MjY2NyA4NS4zMzMzMzMgNTEyIDg1LjMzMzMzM3M0MjYuNjY2NjY3IDE5MS4wMjkzMzMgNDI2LjY2NjY2NyA0MjYuNjY2NjY3LTE5MS4wMjkzMzMgNDI2LjY2NjY2Ny00MjYuNjY2NjY3IDQyNi42NjY2NjdhNDI0Ljc3ODY2NyA0MjQuNzc4NjY3IDAgMCAxLTIxOS4xMjUzMzMtNjAuNTAxMzM0IDI3ODYuNTYgMjc4Ni41NiAwIDAgMC0yMC4wNTMzMzQtMTEuNzY1MzMzbC0xMDQuNDA1MzMzIDI4LjQ4Yy0yMy44OTMzMzMgNi41MDY2NjctNDUuODAyNjY3LTE1LjQxMzMzMy0zOS4yODUzMzMtMzkuMjk2bDI4LjQzNzMzMy0xMDQuMjg4eiBtNjUuMzAxMzMzIDMuNzg2NjY3bC0xNy4yNTg2NjYgNjMuMzA2NjY2IDYzLjMwNjY2Ni0xNy4yNTg2NjZhMzIgMzIgMCAwIDEgMjQuNTIyNjY3IDMuMjEwNjY2IDQ1MTUuODQgNDUxNS44NCAwIDAgMSAzMi4zNTIgMTguOTQ0QTM2MC43ODkzMzMgMzYwLjc4OTMzMyAwIDAgMCA1MTIgODc0LjY2NjY2N2MyMDAuMjk4NjY3IDAgMzYyLjY2NjY2Ny0xNjIuMzY4IDM2Mi42NjY2NjctMzYyLjY2NjY2N1M3MTIuMjk4NjY3IDE0OS4zMzMzMzMgNTEyIDE0OS4zMzMzMzMgMTQ5LjMzMzMzMyAzMTEuNzAxMzMzIDE0OS4zMzMzMzMgNTEyYzAgNjAuNTg2NjY3IDE0Ljg0OCAxMTguOTU0NjY3IDQyLjgyNjY2NyAxNzEuMTM2IDMuNzEyIDYuOTEyIDEyLjkyOCAyMi44MjY2NjcgMjcuMzcwNjY3IDQ3LjIzMmEzMiAzMiAwIDAgMSAzLjMzODY2NiAyNC43MTQ2Njd6IG0xNDUuOTk0NjY3LTcwLjc3MzMzNGEzMiAzMiAwIDEgMSA0MC45MTczMzMtNDkuMjA1MzMzQTE1OS4xODkzMzMgMTU5LjE4OTMzMyAwIDAgMCA1MTIgNjcyYzM3Ljg4OCAwIDczLjY3NDY2Ny0xMy4xNzMzMzMgMTAyLjE4NjY2Ny0zNi44ODUzMzNhMzIgMzIgMCAwIDEgNDAuOTE3MzMzIDQ5LjIxNkEyMjMuMTc4NjY3IDIyMy4xNzg2NjcgMCAwIDEgNTEyIDczNmEyMjMuMTc4NjY3IDIyMy4xNzg2NjcgMCAwIDEtMTQzLjEzNi01MS42OTA2Njd6IiBwLWlkPSIyMTY3Ij48L3BhdGg+PC9zdmc+",
        "fav":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjc1Mzk0MTE3MTYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2ODIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTcyNi4yIDkxN0gxNjYuN2MtNDQuNyAwLTgxLjEtMzcuMy04MS4xLTgzLjJWNDgyLjVjMC00Ni4yIDM3LjEtODUuMyA4MS4xLTg1LjNoMTAxLjRjNDYuNCAwIDg5LTE5LjMgMTIzLjEtNTUuOHM1OS43LTkxLjkgNzEuNS0xNTcuMmE5MS42IDkxLjYgMCAwIDEgMzMuMi01NS43IDk5LjcgOTkuNyAwIDAgMSA2Mi0yMS4zYzUyLjYgMCA5NS4zIDQzLjkgOTUuMyA5Ny44djE1MC43aDE4NC41YTk5LjggOTkuOCAwIDAgMSA3OS45IDM5LjYgMTA0IDEwNCAwIDAgMSAxNy40IDkxLjNsLTkxLjMgMzM5Yy0xNC4xIDUzLjgtNjIuNCA5MS40LTExNy41IDkxLjR6TTE2Ni43IDQ0OC40Yy0xNS42IDAtMjkuOSAxNi4zLTI5LjkgMzQuMXYzNTEuM2MwIDE3LjQgMTMuNyAzMiAyOS45IDMyaDU1OS41YzMxLjggMCA1OS44LTIxLjkgNjgtNTMuM3YtMC4ybDkxLjMtMzM5LjFjNC41LTE2LjYgMS40LTMzLjYtOC43LTQ2LjhhNDkuMiA0OS4yIDAgMCAwLTM5LjItMTkuNkg2MDJWMjA1YzAtMjUuNy0xOS44LTQ2LjYtNDQuMS00Ni42LTIyLjggMC00MS4yIDE0LjMtNDQuOCAzNC44LTEzLjYgNzUuMS00Mi44IDEzOC40LTg0LjUgMTgzLjEtMjEuNiAyMy4yLTQ2LjQgNDEuMi03My41IDUzLjRhMjA5LjcgMjA5LjcgMCAwIDEtODcgMTguN3oiIHAtaWQ9IjE2ODMiPjwvcGF0aD48cGF0aCBkPSJNMjcxLjggNDMzLjZIMzIzdjQ2OS4yMWgtNTEuMnoiIHAtaWQ9IjE2ODQiPjwvcGF0aD48L3N2Zz4=",
        "unfav":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjc1Mzk0MTEyNDY2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1NDMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTM0NCA5MTdWMzg3LjZjNjcuNy0yNC43IDEyMC4zLTk2IDEzOS43LTIwMy40IDguMS00NS43IDQ4LjYtNzYuOSA5NS4zLTc2LjkgNTIuNyAwIDk1LjMgNDMuNyA5NS4zIDk3Ljd2MTUwLjdoMTg0LjVjNjYuOSAwIDExNS41IDY0LjUgOTcuMyAxMzFsLTkxLjIgMzM4LjljLTE0LjIgNTQuMS02Mi44IDkxLjUtMTE3LjYgOTEuNUgzNDR6IG0tNTEuMiAwSDE4Ny43Yy00NC42IDAtODEuMS0zNy40LTgxLjEtODMuMlY0ODIuNWMwLTQ1LjcgMzYuNS04NS4yIDgxLjEtODUuMkgyOTIuOFY5MTd6IiBmaWxsPSIjMEMwQzBDIiBwLWlkPSIxNTQ0Ij48L3BhdGg+PC9zdmc+",
        "tread":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjc1Mzk0MTAxNDcwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyNjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTU1OCA5MThhMTAwIDEwMCAwIDAgMS02Mi4xLTIxLjMgOTEuNyA5MS43IDAgMCAxLTMzLjMtNTUuOGMtMTEuNy02NS4zLTM2LjUtMTE5LjctNzEuNS0xNTcuMnMtNzYuNy01NS45LTEyMy4yLTU1LjlIMTY2LjVjLTQzLjkgMC04MS4xLTM5LTgxLjEtODUuM1YxOTFjMC00NS45IDM2LjQtODMuMiA4MS4xLTgzLjJoNTU5LjhjNTUuMSAwIDEwMy41IDM3LjYgMTE3LjYgOTEuNWw5MS4zIDMzOWExMDQgMTA0IDAgMCAxLTE3LjQgOTEuMyA5OS45IDk5LjkgMCAwIDEtODAgMzkuN0g2NTMuM3YxNTAuOWMwIDUzLjktNDIuOCA5Ny44LTk1LjMgOTcuOHpNMTY2LjUgMTU5Yy0xNi4yIDAtMjkuOSAxNC42LTI5LjkgMzJ2MzUxLjVjMCAxNy45IDE0LjMgMzQuMSAyOS45IDM0LjFoMTAxLjRhMjA5LjggMjA5LjggMCAwIDEgODcuMSAxOC43YzI3LjIgMTIuMyA1MS45IDMwLjMgNzMuNiA1My41IDQxLjcgNDQuNyA3MC45IDEwOCA4NC40IDE4My4xIDMuNyAyMC42IDIyLjEgMzQuOSA0NSAzNC45czQ0LjEtMjAuOSA0NC4xLTQ2LjZ2LTIwMmgyMzUuN2E0OS4yIDQ5LjIgMCAwIDAgMzkuMy0xOS41YzEwLjEtMTMuMiAxMy4yLTMwLjMgOC43LTQ2Ljh2LTAuMmwtOTEuNC0zMzkuM2MtOC4yLTMxLjUtMzYuMy01My40LTY4LjEtNTMuNHoiIHAtaWQ9IjEyNjUiPjwvcGF0aD48cGF0aCBkPSJNMjcxLjggMTIyLjJIMzIzdjQ2OS4yMWgtNTEuMnoiIHAtaWQ9IjEyNjYiPjwvcGF0aD48L3N2Zz4=",
        "untread":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjc1Mzk0MTA3ODU5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0MDQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTMyMi40IDEwNy4ydjUyOS40YzY3LjcgMjQuNyAxMjAuMyA5NiAxMzkuNyAyMDMuNCA4LjEgNDUuNyA0OC42IDc2LjkgOTUuMyA3Ni45IDUyLjcgMCA5NS4zLTQzLjcgOTUuMy05Ny43VjY2OC42aDE4NC41YzY2LjkgMCAxMTUuNS02NC41IDk3LjMtMTMxbC05MS40LTMzOC45Yy0xNC4xLTU0LTYyLjgtOTEuNS0xMTcuNS05MS41SDMyMi40eiBtLTUxLjIgMEgxNjYuMWMtNDQuNiAwLTgxLjEgMzcuNS04MS4xIDgzLjJ2MzUxLjRjMCA0NS43IDM2LjUgODUuMiA4MS4xIDg1LjJIMjcxLjJWMTA3LjJ6IiBwLWlkPSIxNDA1Ij48L3BhdGg+PC9zdmc+",
        "write":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjY0OTI3MTMzNzUxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIzMDUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg2Mi43MDkzMzMgMTE2LjA0MjY2N2EzMiAzMiAwIDEgMSA0NS4yNDggNDUuMjQ4TDQ1NS40NDUzMzMgNjEzLjgxMzMzM2EzMiAzMiAwIDEgMS00NS4yNTg2NjYtNDUuMjU4NjY2TDg2Mi43MDkzMzMgMTE2LjA1MzMzM3pNODUzLjMzMzMzMyA0NDhhMzIgMzIgMCAwIDEgNjQgMHYzNTJjMCA2NC44LTUyLjUzMzMzMyAxMTcuMzMzMzMzLTExNy4zMzMzMzMgMTE3LjMzMzMzM0gyMjRjLTY0LjggMC0xMTcuMzMzMzMzLTUyLjUzMzMzMy0xMTcuMzMzMzMzLTExNy4zMzMzMzNWMjI0YzAtNjQuOCA1Mi41MzMzMzMtMTE3LjMzMzMzMyAxMTcuMzMzMzMzLTExNy4zMzMzMzNoMzQxLjMzMzMzM2EzMiAzMiAwIDAgMSAwIDY0SDIyNGE1My4zMzMzMzMgNTMuMzMzMzMzIDAgMCAwLTUzLjMzMzMzMyA1My4zMzMzMzN2NTc2YTUzLjMzMzMzMyA1My4zMzMzMzMgMCAwIDAgNTMuMzMzMzMzIDUzLjMzMzMzM2g1NzZhNTMuMzMzMzMzIDUzLjMzMzMzMyAwIDAgMCA1My4zMzMzMzMtNTMuMzMzMzMzVjQ0OHoiIHAtaWQ9IjIzMDYiPjwvcGF0aD48L3N2Zz4=",
    };

    var cls={
        pub:{
            fav:'',
            tread:'',
        },
        basic:{
            row: '',
            account:'',
            block:'',
            operation:'',
            count:'',
            icon:'',
            time:'',
            avatar:'',
            main:'',
        },
        history:{
            row: '',
            account:'',
            block:'',
            operation:'',
            count:'',
            icon:'',
            time:'',
            avatar:'',
        },
        auth:{
            row: '',
            account:'',
            block:'',
            operation:'',
            count:'',
            icon:'',
            time:'',
            avatar:'',
        },
        comment:{
            avatar:'',
            account:'',
            content:'',
            reply:'',
        },
        quote:{},
    };
    var common=App.cache.getG("common");
    var self={
        row:function(row,type){
            if(!self[type]) return false;
            return self[type](row,cls[type],cls.pub);
        },

        //TODO:需要优化block number和anchor名称的样式
        theme:function(type,entry){
            var c=cls[type];
            var map={
                basic:`#${entry} hr{color:#CCCCCC}
                    #${entry} .${c.account}{font-size:12px;color:#EF8889;}
                    #${entry} .${c.main}{color:#EF8889;}
                    #${entry} .${c.row}{font-weight:500;}
                    #${entry} .${c.block}{font-size:16px;}
                    #${entry} .${c.operation}{font-size:12px;}
                    #${entry} .${c.count}{margin-top:4px;}
                    #${entry} .${c.time}{color:#AAAAAA;font-size:12px;}
                    #${entry} .${c.avatar}{width:30px;height:30px;border-radius:15px;background:#FFAABB}
                    #${entry} .${c.icon}{opacity:0.7;}`,
                history:`#${entry} hr{color:#CCCCCC}
                    #${entry} .${c.account}{font-size:10px;color:#EF8889;}
                    #${entry} .${c.block}{font-size:10px;}
                    #${entry} .${c.operation}{font-size:10px;}
                    #${entry} .${c.count}{margin-top:4px;}
                    #${entry} .${c.time}{color:#AAAAAA;font-size:10px;}
                    #${entry} .${c.avatar}{width:30px;height:30px;border-radius:15px;background:#FFAABB}
                    #${entry} .${c.icon}{opacity:0.7;}`,
                auth:`#${entry} hr{color:#CCCCCC}
                    #${entry} .${c.account}{font-size:10px;color:#EF8889;}
                    #${entry} .${c.block}{font-size:10px;}
                    #${entry} .${c.operation}{font-size:10px;}
                    #${entry} .${c.count}{margin-top:4px;}
                    #${entry} .${c.time}{color:#AAAAAA;font-size:10px;}
                    #${entry} .${c.avatar}{width:30px;height:30px;border-radius:15px;background:#FFAABB}
                    #${entry} .${c.icon}{opacity:0.7;}`,
                comment:`#${entry} .${c.avatar} {}
                    #${entry} .${c.account} {font-size:12px;color:#EF8889}
                    #${entry} .${c.content} {font-size:16px;font-weight:500;}
                    #${entry} .${c.avatar}{width:30px;height:30px;border-radius:15px;background:#FFAABB}
                    #${entry} .${c.reply}  {background:#EEEEEE;border-radius:8px;font-size:12px;padding:4px 8px 6px 4px;}`,
                snap:`#${entry}{}
                    #${entry} .${c.name}{}`,
                quote:`#${entry}{}
                    #${entry} .${c.name}{}`,
            };
            return map[type];
        },
        action:function(row,cls,pub){
            var ctx = row.raw,owner=row.owner;
            var anchor=row.name,block=row.block;
            var desc=!ctx.desc ? App.tools.tailor(ctx.content,80) : ctx.desc;
            var ft=JSON.stringify({anchor: anchor, block: block});
            var ct=JSON.stringify({ anchor: anchor, block:block,owner:owner,title:desc});
            return `<div class="row">
                <div class="col-3  ${cls.time}">
                    ${App.tools.time(row.stamp)}
                </div>
                <div class="col-3">
                    <img style="widht:21px;height:21px;margin-left:15px" class="${pub.fav} ${self.getClass(anchor,block,'fav',true)}" data='${ft}' src="${icons.fav}">
                    <span class="${cls.count} ${self.getClass(anchor,block,'fav')}">0</span>
                </div>
                <div class="col-3">
                    <img style="widht:21px;height:21px;margin-left:15px" class="${pub.tread} ${self.getClass(anchor,block,'tread',true)}" data='${ft}' src="${icons.tread}">
                    <span class="${cls.count} ${self.getClass(anchor,block,'tread')}">0</span>
                </div>
                <div class="col-3">
                    <span page="board" data='${ct}'>
                        <img style="widht:21px;height:21px;margin-left:15px" src="${icons.comment}">
                    </span>
                    <span class="${cls.count} ${self.getClass(anchor,block)}">0</span>
                </div>
            </div>`;
        },
        flipICON:function(anchor,block,val,type){
            var id=self.getClass(anchor,block,type,true);
            if(type==='fav'){
                $('.'+id).attr('src',val===1?icons.unfav:icons.fav);
            }else{
                $('.'+id).attr('src',val===1?icons.untread:icons.tread);
            }
        },
        basic:function(row,cls,pub){
            var ctx = row.raw,owner=row.owner;
            var dt = { anchor: row.name, block: row.block, owner: owner };
            var igs=ctx.imgs && ctx.imgs.length>0?self.getImages(ctx.imgs):'';
            var desc=!ctx.desc ? App.tools.tailor(ctx.content,80) : ctx.desc;
            setTimeout(function(){
                common.getAvatar(owner,function(img){
                    $('.'+owner).attr("src",img.src);
                });
            },100);
            var name=/^[a-z0-9]{32}$/.test(row.name)?App.tools.decor(row.name):row.name;
            var tdom=!ctx.title?`<div class="col-12 pt-2 ${cls.row}" ></div>`:`<div class="col-12 pt-2 ${cls.row}" >
                <span page="view" data='${JSON.stringify(dt)}'><h5>${ctx.title}</h5></span>
            </div>`;
            var adom=self.action(row,cls,pub);
            return `<div class="row">
                ${tdom}
                <div class="col-6 ${cls.account}">
                    <span page="auth" data='${JSON.stringify({auth: owner})}'>
                        <img src="${icons.auth}" class="${cls.avatar} ${owner}">
                        ${App.tools.shorten(owner, 8)}
                    </span>
                </div>
                <div class="col-6 ${cls.block} text-end">
                    <span class="badge bg-light pt-2 pb-2" page="history" data='${JSON.stringify({ anchor: row.name })}'>
                        <img class="${cls.icon}" style="widht:10px;height:10px;margin:-2px 2px 0px 0px;" src="${icons.block}">
                        <small class="${cls.main}">${parseInt(row.block).toLocaleString()}</small>
                        <img class="${cls.icon}" style="widht:12px;height:12px;margin:-2px 0px 0px 8px;" src="${icons.anchor}">
                        <small class="${cls.main}">${name}</small>
                    </span>
                </div>
                <div class="col-12 gy-2 ${cls.row}">
                    <span page="view" data='${JSON.stringify(dt)}'>${desc}</span>
                </div>
                <div class="col-12">
                    <span page="view" data='${JSON.stringify(dt)}'>
                        <div class="row">${igs}</div>
                    </span>
                </div>
                <div class="col-12 gy-2 ${cls.operation}">${adom}</div>
                <div class="col-12"><hr /></div>
            </div>`;
        },
        history:function(row,cls){
            //console.log(row);
            var ctx = row.raw;
            var dt = { anchor: row.name, block: row.block, owner: row.signer };
            var igs=ctx.imgs && ctx.imgs.length>0?self.getImages(ctx.imgs):'';
            var cmt= { anchor: row.name, block: row.block,owner:row.signer,title:!ctx.title?'':ctx.title};
            var ct=JSON.stringify(cmt);
            setTimeout(function(){
                common.getAvatar(row.signer,function(img){
                    $('.'+row.signer).attr("src",img.src);
                });
            },50);
            //TODO:历史样式，增加fav和tread的功能
            return `<div class="row">
                <div class="col-12 pt-2 ${cls.row}" >
                    <span page="view" data='${JSON.stringify(dt)}'><h5>${!ctx.title?'':ctx.title}</h5></span>
                </div>
                <div class="col-8 ${cls.account}">
                    <span page="auth" data='${JSON.stringify({auth: row.signer})}'>
                        <img src="${icons.auth}" class="${cls.avatar} ${row.signer}">
                        ${App.tools.shorten(row.signer, 8)}
                    </span>
                </div>
                <div class="col-4 ${cls.block} pt-2 text-end">
                    <img class="${cls.icon}" style="widht:10px;height:10px;margin:-2px 6px 0px 0px;" src="${icons.block}">
                    <strong>${parseInt(row.block).toLocaleString()}</strong>
                </div>
                <div class="col-12 gy-2 ${cls.row}">
                    <span page="view" data='${JSON.stringify(dt)}'>${!ctx.desc ? App.tools.tailor(ctx.content,80) : ctx.desc}</span>
                </div>
                <div class="col-12">
                    <span page="view" data='${JSON.stringify(dt)}'>
                        <div class="row">${igs}</div>
                    </span>
                </div>
                <div class="col-8 gy-2 ${cls.time}">
                    ${App.tools.time(row.stamp)}
                </div>
                <div class="col-4 text-end gy-2 ${cls.operation}">
                    <span page="board" data='${ct}'>
                        <img style="widht:21px;height:21px;" src="${icons.comment}">
                    </span>
                    <span class="${cls.count} ${self.getClass(row.name,row.block)}">0</span>
                </div>
                <div class="col-12"><hr /></div>
            </div>`;
        },
        auth:function(row,cls){
            //console.log(row);
            //console.log(App.tools.time(row.stamp));
            var ctx = row.raw;
            var dt = { anchor: row.name, block: row.block, owner: row.signer };
            var igs=ctx.imgs && ctx.imgs.length>0?self.getImages(ctx.imgs):'';
            var cmt= { anchor: row.name, block: row.block,owner:row.signer,title:!ctx.title?'':ctx.title};
            var ct=JSON.stringify(cmt);
            setTimeout(function(){
                common.getAvatar(row.signer,function(img){
                    $('.'+row.signer).attr("src",img.src);
                });
            },50);
            //TODO:账户样式，增加fav和tread的功能
            return `<div class="row">
                <div class="col-12 pt-2 ${cls.row}" >
                    <span page="view" data='${JSON.stringify(dt)}'><h5>${ctx.title}</h5></span>
                </div>
                <div class="col-8 ${cls.account}">
                    <span>
                        <img src="${icons.auth}" class="${cls.avatar} ${row.signer}">
                        ${App.tools.shorten(row.signer, 8)}
                    </span>
                </div>
                <div class="col-4 ${cls.block} pt-2 text-end">
                    <img class="${cls.icon}" style="widht:10px;height:10px;margin:-2px 6px 0px 0px;" src="${icons.block}">
                    <strong>${parseInt(row.block).toLocaleString()}</strong> , 
                    <img class="${cls.icon}" style="widht:12px;height:12px;margin:-2px 0px 0px 0px;" src="${icons.anchor}">
                    <span page="history" data='${JSON.stringify({ anchor: row.name })}'>
                        <strong>${row.name}</strong>
                    </span>
                </div>
                <div class="col-12 gy-2 ${cls.row}">
                    <span page="view" data='${JSON.stringify(dt)}'>${!ctx.desc ? App.tools.tailor(ctx.content,80) : ctx.desc}</span>
                </div>
                <span page="view" data='${JSON.stringify(dt)}'>${igs}</span>
                <div class="col-8 gy-2 ${cls.time}">
                    ${App.tools.time(row.stamp)}
                </div>
                <div class="col-4 text-end gy-2 ${cls.operation}">
                    <span page="comment" data='${ct}'>
                        <img style="widht:21px;height:21px;" src="${icons.comment}">
                    </span>
                    <span class="${cls.count} ${self.getClass(row.name,row.block)}">0</span>
                </div>
                <div class="col-12"><hr /></div>
            </div>`;
        },
        comment:function(row,cls){
            //console.log(row);
            var protocol=row.protocol,raw=row.raw,auth=protocol.auth;
            var anchor=row.name,block=row.block;
            var dt={
                anchor:anchor,
                block:block,
                owner:row.signer,
                auth:auth,
                title:raw.content
            };
            setTimeout(function(){
                common.getAvatar(auth,function(img){
                    $('.'+auth).attr("src",img.src);
                });
            },50);
            
            return `<div class="row">
                <div class="col-9 mt-4 ${cls.account}">
                    <span page="auth" data='${JSON.stringify({auth:auth})}'>
                        <img src="${icons.auth}" class="${cls.avatar} ${auth}">
                        ${App.tools.shorten(auth, 12)}
                    </span>
                </div>
                <div class="col-3 mt-4 text-end">
                    <img style="widht:12px;height:12px;margin:0px 1px 0px 0px;opacity:0.7;" src="${icons.block}">
                    <span style="font-size:12px;">${parseInt(block).toLocaleString()}</span>
                </div>
                <div class="col-1"></div><div class="col-11  ${cls.content}">${raw.content}</div>
                <div class="col-1"></div><div class="col-11 pt-1">
                    <span page="board" data='${JSON.stringify(dt)}' class="${cls.reply}"> 
                    <img style="widht:14px;height:14px;margin:-2px 2px 0px 4px;opacity:0.7;" src="${icons.comment}">
                    reply <i class="${self.getClass(anchor,block)}"></i>
                    </span>
                    <span style="font-size:12px;margin:4px 0px 0px 10px;color:#AAAAAA">
                        ${App.tools.time(row.stamp)}
                    </span>
                </div>
            </div>`;
        },

        //TODO:引用样式，评论的引用样式
        quote:function(row,cls){
            return ``;
        },
        
        getImages:function(imgs){
            var len=imgs.length,num = 12/len;
            var dom='';
            var h=len==1?240:300/len;
            for(var i=0;i<len;i++){
                var img=imgs[i];
                dom+=`<div class="col-${num}">
                    <div style="height:${h}px;background:#FFFFFF url(${img}) no-repeat center center;background-size:cover;"></div>
                </div>`;
            }
            return dom;
        },
        getClass:function(anchor,block,type,icon){
            var pre=!type?'comment':type;
            if(icon===undefined) return `${pre}_${anchor}_${block}`;
            return `${pre}_${anchor}_${block}_i`;
        },
        struct:function(){
            var pre='t';
            var hash = App.tools.hash;
            for (var type in cls) {
                for(var k in cls[type]){
                    if (!cls[type][k]) cls[type][k] = pre + hash();
                }
            }
        },
        bind:function(){
            var pub=cls.pub;
            $(`.${pub.fav}`).off('click').on('click',common.clickFav);
            $(`.${pub.tread}`).off('click').on('click',common.clickTread);
        },
    };
    self.struct();
    App.cache.setAgent('fresh',self.bind);
    App.cache.setG("tpl",self);
    App.cache.setG("icons",icons);
})(cMedia);