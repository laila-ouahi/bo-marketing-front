import React from "react";
import { Table, Pagination } from "antd";
import styled from "styled-components";

export default ({
  columns,
  data,
  loading,
  total,
  current,
  onChange,
  noResultat,
  rowSelection,
  onChangeSelect,
  selectedRowKeys,
  expandedRowRender,
  className,
  rowClassName,
  scroll
}) => {
  return (
    <TableStyled>
      {data && !noResultat && (
        <p className="paraContent">{total} Résultat(s)</p>
      )}
      {noResultat && <br />}
      <div>
        <Table
          rowSelection={
            rowSelection
              ? {
                  type: "checkbox",
                  onChange: onChangeSelect,
                  selectedRowKeys: selectedRowKeys
                }
              : false
          }
          rowClassName={rowClassName}
          columns={columns.filter(item => item !== undefined)}
          className={className}
          dataSource={data}
          expandedRowRender={expandedRowRender}
          loading={loading}
          pagination={{
            pageSize: 5,
            hideOnSinglePage: true
          }}
          size="middle"
          scroll={scroll}
        />
      </div>
      <PaginationStyled
        current={current}
        onChange={onChange}
        total={total}
        hideOnSinglePage
      />
    </TableStyled>
  );
};

export const TableStyled = styled.div`
  float: left;
  width: 100%;
  margin-bottom: 25px;
  .table-row-red {
    background-color: #feecec;
    td {
      .icon {
        background: #e73114;
      }
    }
  }
  .table-button-grey {
    td {
      .icon {
        background: #404040 !important;
      }
    }
  }
  .textLeft {
    table {
      td,
      th {
        padding-left: 30px !important;
        text-align: left;
      }
    }
  }
  .ant-table-fixed-right {
    table {
      &.ant-table-fixed {
        .ant-table-tbody {
          tr {
            &.ant-table-expanded-row {
              display: none;
            }
          }
        }
      }
    }
  }
  .ant-table-content {
    background: #fff;
    border-radius: 15px !important;
    margin: auto;
    overflow: auto;
    max-width: 100vw;
    @media (max-width: 1024px) {
      max-width: 70vw;
      max-height: 77vh;
    }
    box-shadow: 0 0 17px -3px rgba(0, 0, 0, 0.2);
  }
  .paraContent {
    @media (max-width: 1440px) {
      margin-left: 0px;
    }
    @media (max-width: 1024px) {
      margin-left: 0px;
    }
    @media (max-width: 768px) {
      margin-left: 0px;
    }
    @media (max-width: 375px) {
      margin-left: 10px;
    }
  }
  table {
    thead {
      tr {
        th {
          background: transparent;
          color: #006f6e;
          font-weight: 700;
          font-size: 16px;
          @media (max-width: 1440px) {
            font-size: 14px;
          }
          @media (max-width: 1024px) {
            font-size: 12px;
          }
          @media (max-width: 768px) {
            font-size: 10px;
          }
          @media (max-width: 375px) {
            font-size: 9px;
          }
          border-right: 2px solid #e6e6e6;
          text-align: center;
          &:last-child {
            border-right: none;
          }
        }
        &:nth-child(2) {
          position: relative;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 46px;
            border-top: 2px solid #e6e6e6;
          }
        }
      }
    }
    tbody {
      tr {
        &.disabled-row {
          background-color: #dcdcdc;
          pointer-events: none;
        }
        td {
          padding: 11px 16px;
          color: #646678;
          font-weight: 600;
          font-size: 14px;
          @media (max-width: 1440px) {
            font-size: 14px;
          }
          @media (max-width: 1024px) {
            font-size: 12px;
          }
          @media (max-width: 768px) {
            font-size: 10px;
          }
          @media (max-width: 375px) {
            font-size: 9px;
          }
          text-align: center;
          border-right: 2px solid #e6e6e6;
          &:last-child {
            border-right: none;
          }
          .icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            border-radius: 40px;
            text-align: center;
            line-height: 32px;
            background: #008991;
            color: #fff;
            font-size: 17px;
            @media (max-width: 1024px) {
              font-size: 16px;
            }
            @media (max-width: 768px) {
              font-size: 14px;
            }
            @media (max-width: 375px) {
              font-size: 12px;
            }
            a {
              color: #fff;
            }
            .anticon {
              color: #fff;
            }
          }
          .anticon {
            font-size: 18px;
            @media (max-width: 1024px) {
              font-size: 17px;
            }
            @media (max-width: 768px) {
              font-size: 15px;
            }
            @media (max-width: 375px) {
              font-size: 13px;
            }
            margin: 0 4px;
            color: #008991;
          }
        }
      }
    }
  }
`;

export const PaginationStyled = styled(props => <Pagination {...props} />)`
  float: left;
  width: 100%;
  margin-top: 20px !important;
  text-align: center;
  li {
    margin: 0;
  }
`;
