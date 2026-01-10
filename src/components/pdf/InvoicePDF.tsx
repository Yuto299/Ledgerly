import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { formatDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/money/formatter";

// フォント登録（日本語対応）
Font.register({
  family: "Noto Sans JP",
  src: "https://fonts.gstatic.com/s/notosansjp/v42/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEi75vY0rw-oME.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Noto Sans JP",
    fontSize: 10,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#4f46e5",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: 100,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 8,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableCol1: {
    width: "40%",
  },
  tableCol2: {
    width: "15%",
    textAlign: "right",
  },
  tableCol3: {
    width: "15%",
    textAlign: "right",
  },
  tableCol4: {
    width: "15%",
    textAlign: "right",
  },
  tableCol5: {
    width: "15%",
    textAlign: "right",
  },
  totalSection: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    marginBottom: 8,
    width: 250,
  },
  totalLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: "bold",
  },
  totalValue: {
    width: 100,
    textAlign: "right",
    fontSize: 11,
  },
  grandTotal: {
    fontSize: 14,
    fontWeight: "bold",
    borderTopWidth: 2,
    borderTopColor: "#4f46e5",
    paddingTop: 8,
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    fontSize: 9,
    color: "#6b7280",
  },
  statusBadge: {
    alignSelf: "flex-start",
    padding: "4px 8px",
    borderRadius: 4,
    fontSize: 10,
    fontWeight: "bold",
  },
  statusDraft: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
  },
  statusSent: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  statusPaid: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
});

interface InvoiceItem {
  id: string;
  name: string;
  description?: string | null;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string | null;
  status: string;
  issuedAt: Date;
  dueAt: Date;
  totalAmount: number;
  paidAmount: number;
  notes?: string | null;
  customer: {
    name: string;
    email?: string | null;
    phone?: string | null;
    contactName?: string | null;
  };
  project?: {
    name: string;
  } | null;
  items: InvoiceItem[];
}

interface InvoicePDFProps {
  invoice: Invoice;
  companyInfo?: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
}

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "下書き",
  SENT: "請求済",
  PAID: "入金済",
};

export const InvoicePDF = ({ invoice, companyInfo }: InvoicePDFProps) => {
  const unpaidAmount = invoice.totalAmount - invoice.paidAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.title}>請求書</Text>
          <View
            style={[
              styles.statusBadge,
              invoice.status === "DRAFT"
                ? styles.statusDraft
                : invoice.status === "SENT"
                ? styles.statusSent
                : styles.statusPaid,
            ]}
          >
            <Text>{STATUS_LABELS[invoice.status] || invoice.status}</Text>
          </View>
        </View>

        {/* 請求書情報 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>請求書情報</Text>
          <View style={styles.row}>
            <Text style={styles.label}>請求書番号:</Text>
            <Text style={styles.value}>
              {invoice.invoiceNumber || "未発行"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>発行日:</Text>
            <Text style={styles.value}>{formatDate(invoice.issuedAt)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>支払期限:</Text>
            <Text style={styles.value}>{formatDate(invoice.dueAt)}</Text>
          </View>
          {invoice.project && (
            <View style={styles.row}>
              <Text style={styles.label}>案件:</Text>
              <Text style={styles.value}>{invoice.project.name}</Text>
            </View>
          )}
        </View>

        {/* 請求先 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>請求先</Text>
          <View style={styles.row}>
            <Text style={styles.label}>顧客名:</Text>
            <Text style={styles.value}>{invoice.customer.name}</Text>
          </View>
          {invoice.customer.contactName && (
            <View style={styles.row}>
              <Text style={styles.label}>担当者:</Text>
              <Text style={styles.value}>{invoice.customer.contactName}</Text>
            </View>
          )}
          {invoice.customer.email && (
            <View style={styles.row}>
              <Text style={styles.label}>メール:</Text>
              <Text style={styles.value}>{invoice.customer.email}</Text>
            </View>
          )}
          {invoice.customer.phone && (
            <View style={styles.row}>
              <Text style={styles.label}>電話:</Text>
              <Text style={styles.value}>{invoice.customer.phone}</Text>
            </View>
          )}
        </View>

        {/* 請求元（会社情報） */}
        {companyInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>請求元</Text>
            <View style={styles.row}>
              <Text style={styles.label}>会社名:</Text>
              <Text style={styles.value}>{companyInfo.name}</Text>
            </View>
            {companyInfo.address && (
              <View style={styles.row}>
                <Text style={styles.label}>住所:</Text>
                <Text style={styles.value}>{companyInfo.address}</Text>
              </View>
            )}
            {companyInfo.phone && (
              <View style={styles.row}>
                <Text style={styles.label}>電話:</Text>
                <Text style={styles.value}>{companyInfo.phone}</Text>
              </View>
            )}
            {companyInfo.email && (
              <View style={styles.row}>
                <Text style={styles.label}>メール:</Text>
                <Text style={styles.value}>{companyInfo.email}</Text>
              </View>
            )}
          </View>
        )}

        {/* 明細テーブル */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>明細</Text>
          <View style={styles.table}>
            {/* テーブルヘッダー */}
            <View style={styles.tableHeader}>
              <Text style={styles.tableCol1}>品名</Text>
              <Text style={styles.tableCol2}>数量</Text>
              <Text style={styles.tableCol3}>単価</Text>
              <Text style={styles.tableCol4}>金額</Text>
            </View>
            {/* テーブル行 */}
            {invoice.items.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <View style={styles.tableCol1}>
                  <Text>{item.name}</Text>
                  {item.description && (
                    <Text style={{ fontSize: 8, color: "#6b7280" }}>
                      {item.description}
                    </Text>
                  )}
                </View>
                <Text style={styles.tableCol2}>{item.quantity}</Text>
                <Text style={styles.tableCol3}>
                  {formatCurrency(item.unitPrice)}
                </Text>
                <Text style={styles.tableCol4}>
                  {formatCurrency(item.amount)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* 合計 */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>小計:</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoice.totalAmount)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>入金済:</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoice.paidAmount)}
            </Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.totalLabel}>未払金額:</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(unpaidAmount)}
            </Text>
          </View>
        </View>

        {/* 備考 */}
        {invoice.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>備考</Text>
            <Text>{invoice.notes}</Text>
          </View>
        )}

        {/* フッター */}
        <View style={styles.footer}>
          <Text>Ledgerly - 副業・個人事業向け売上・経費管理システム</Text>
          <Text>発行日: {formatDate(new Date())}</Text>
        </View>
      </Page>
    </Document>
  );
};
