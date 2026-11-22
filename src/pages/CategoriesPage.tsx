import { Link } from "react-router-dom"
import { CATEGORY_LABELS, CATEGORY_LIST } from "../categories"
import { formatMoney } from "../format"
import { usePaymentsStore } from "../store"
import { TCategory } from "../types"

interface Row {
    category: TCategory
    count: number
    paidCount: number
    total: number
    due: number
}

export default function CategoriesPage() {
    const items = usePaymentsStore((s) => s.items)

    const map = Object.fromEntries(
        CATEGORY_LIST.map((c) => [
            c,
            { category: c, count: 0, paidCount: 0, total: 0, due: 0 },
        ]),
    ) as Record<TCategory, Row>

    items.forEach((p) => {
        const row = map[p.category]
        row.count += 1
        row.total += p.amount
        if (p.paid) {
            row.paidCount += 1
        } else {
            row.due += p.amount
        }
    })

    const rows = CATEGORY_LIST.map((c) => map[c])
        .filter((r) => r.count > 0)
        .sort((a, b) => b.total - a.total)

    if (rows.length === 0) {
        return (
            <p className="empty">
                Данных пока нет.{" "}
                <Link to="/">Добавить подписку</Link>
            </p>
        )
    }

    return (
        <ul className="list">
            {rows.map((r) => (
                <li key={r.category} className="cat">
                    <div className={`cat__head ${r.category}`}>
                        <span>{CATEGORY_LABELS[r.category]}</span>
                        <span>{r.count} шт.</span>
                    </div>
                    <div className="cat__body">
                        <p className="cat__total">
                            {formatMoney(r.total)}
                        </p>
                        <div className="meter" aria-hidden="true">
                            <i
                                style={{
                                    width: `${((r.total - r.due) / r.total) * 100}%`,
                                }}
                            />
                        </div>
                        <p className="row">
                            <span>Оплачено</span>
                            <b>
                                {r.paidCount} из {r.count}
                            </b>
                        </p>
                        <p className="row">
                            <span>К оплате</span>
                            <b>{formatMoney(r.due)}</b>
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    )
}