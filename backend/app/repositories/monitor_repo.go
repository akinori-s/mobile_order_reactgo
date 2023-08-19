package repositories

import (
	"mobile_order/app/models"
	"database/sql"
)

type MonitorRepository struct {
	DB *sql.DB
}

func NewMonitorRepository(db *sql.DB) *MonitorRepository {
	return &MonitorRepository{
		DB: db,
	}
}

func (r *MonitorRepository) GetPendingOrders() ([]models.Transaction, error) {
    query := `
        SELECT t.ID, t.DATETIME, t.TOTAL_PRICE, s.NAME, m.NAME, o.ID, o.QUANTITY, o.SUBTOTAL
        FROM TRANSACTION t
		JOIN ORDER_STATUS s
			ON t.STATUS_ID = s.ID
        JOIN ORDER_DETAILS o
			ON t.ID = o.TRANSACTION_ID
		JOIN MENU m
			ON o.ITEM_ID = m.ID
        WHERE s.NAME = 'Pending'
        ORDER BY t.id;
    `

    rows, err := r.DB.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    transactionsMap := make(map[int]*models.Transaction)
    var transactions []models.Transaction

    for rows.Next() {
        var t models.Transaction
        var item models.OrderDetail
        if err := rows.Scan(&t.ID, &t.Datetime, &t.Total_price, &t.Status, &item.Item_name, &item.ID, &item.Quantity, &item.Subtotal); err != nil {
            return nil, err
        }

        if _, exists := transactionsMap[t.ID]; exists {
            transactions[t.ID - 1].Items = append(transactions[t.ID - 1].Items, item)
        } else {
            t.Items = []models.OrderDetail{item}
            transactionsMap[t.ID] = &t
            transactions = append(transactions, t)
        }
    }
    return transactions, nil
}

func (r *MonitorRepository) UpdateOrderStatus(orderID int, newStatus string) error {
    query := `
        UPDATE TRANSACTION
        SET STATUS_ID = (SELECT ID FROM ORDER_STATUS WHERE NAME = $1)
        WHERE ID = $2;
    `
    _, err := r.DB.Exec(query, newStatus, orderID)
    return err
}
