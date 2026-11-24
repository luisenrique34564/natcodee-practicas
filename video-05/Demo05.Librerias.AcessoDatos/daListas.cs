using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Demo05.Librerias.EntidadesNegocio;

namespace Demo05.Librerias.AcessoDatos
{
    public class daListas
    {
        public beListas Listar(SqlConnection con)
        {
            beListas obeListas = null;

            // Llamamos al stored procedure que trae los 3 selects
            SqlCommand cmd = new SqlCommand("uspProductsCustomersSuppliersListas", con);
            cmd.CommandType = CommandType.StoredProcedure;
            
            SqlDataReader drd = cmd.ExecuteReader();

            if (drd != null)
            {
                obeListas = new beListas();

                // 1. Primer Select: Productos
                obeListas.listaProducto = new List<beProducto>();
                beProducto obeProducto;
                while (drd.Read())
                {
                    obeProducto = new beProducto();
                    obeProducto.Codigo = drd.GetInt32(0);
                    obeProducto.Nombre = drd.GetString(1);
                    obeProducto.Precio = drd.GetDecimal(2);
                    obeProducto.Stock = Convert.ToInt16(drd.GetValue(3));
                    obeListas.listaProducto.Add(obeProducto);
                }

                // 2. Segundo Select: Clientes
                if (drd.NextResult())
                {
                    obeListas.listaCliente = new List<beCliente>();
                    beCliente obeCliente;
                    while (drd.Read())
                    {
                        obeCliente = new beCliente();
                        obeCliente.Codigo = drd.GetString(0);
                        obeCliente.Nombre = drd.GetString(1);
                        obeCliente.Direccion = drd.GetString(2);
                        obeCliente.Contacto = drd.GetString(3);
                        obeListas.listaCliente.Add(obeCliente);
                    }
                }

                // 3. Tercer Select: Proveedores
                if (drd.NextResult())
                {
                    obeListas.listaProveedor = new List<beProveedor>();
                    beProveedor obeProveedor;
                    while (drd.Read())
                    {
                        obeProveedor = new beProveedor();
                        obeProveedor.Codigo = drd.GetInt32(0);
                        obeProveedor.Nombre = drd.GetString(1);
                        obeProveedor.Direccion = drd.GetString(2);
                        obeProveedor.Contacto = drd.GetString(3);
                        obeListas.listaProveedor.Add(obeProveedor);
                    }
                }

                drd.Close();
            }

            return obeListas;
        }
    }
}
