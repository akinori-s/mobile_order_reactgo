package app

import (
	"mobile_order/app/repositories"
	"mobile_order/app/handlers"
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

type Application struct {
	Router *gin.Engine
}

func NewApplication(db *sql.DB) *Application {

	menuRepository := repositories.NewMenuRepository(db)
	menuHandler := handlers.NewMenuHandler(*menuRepository)

	promotionRepository := repositories.NewPromotionRepository(db)
	promotionHandler := handlers.NewPromotionHandler(*promotionRepository)


	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowCredentials = true
	router.Use(cors.New(config))
	
	router.GET("/menus", menuHandler.GetMenus)
	router.GET("/menu_categories", menuHandler.GetMenuCategories)
	router.GET("/promotions", promotionHandler.GetPromotions)
	
	return &Application{
		Router: router,
	}
}

func (app *Application) Run(addr string) error {
	return app.Router.Run(addr)
}
