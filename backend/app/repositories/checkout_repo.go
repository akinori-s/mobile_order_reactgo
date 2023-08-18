package repositories

import (
	"mobile_order/app/models"
	"database/sql"
	"github.com/lib/pq"
)

type CheckoutRepository struct {
	DB *sql.DB
}

func NewCheckoutRepository(db *sql.DB) *CheckoutRepository {
	return &CheckoutRepository{
		DB: db,
	}
}

func (r *CheckoutRepository) GetIdPriceMapByOrderList(order_details []models.OrderDetail) (map[int]float32, error) {
	var id_list []int
	for _, order_detail := range order_details {
		id_list = append(id_list, order_detail.Item_id)
	}
	query := "SELECT ID, PRICE FROM MENU WHERE ID = ANY($1)"
	rows, err := r.DB.Query(query, pq.Array(id_list))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	IdPriceMap := make(map[int]float32)
	for rows.Next() {
		var id int
		var price float32
		err := rows.Scan(&id, &price)
		if err != nil {
			return nil, err
		}
		IdPriceMap[id] = price
	}
	return IdPriceMap, nil
}

func (r *CheckoutRepository) InsertTransaction(transaction *models.Transaction) error {
	query := "INSERT INTO TRANSACTION (USER_ID, TOTAL_PRICE, STATUS_ID) VALUES ($1, $2, $3) RETURNING ID"
	row := r.DB.QueryRow(query, transaction.User_id, transaction.Total_price, transaction.Status_id)
	err := row.Scan(&transaction.ID)
	return err
}

func (r *CheckoutRepository) InsertOrderDetail(order_detail *models.OrderDetail) error {
	query := "INSERT INTO ORDER_DETAILS (TRANSACTION_ID, ITEM_ID, QUANTITY, SUBTOTAL) VALUES ($1, $2, $3, $4)"
	_, err := r.DB.Exec(query, order_detail.Transaction_id, order_detail.Item_id, order_detail.Quantity, order_detail.Subtotal)
	return err
}
