using System; //Exception
using System.Collections.Generic; //List
using System.Data; //CommandBehavior CommandType
using System.Data.SqlClient; // SqlCommand, SqlConnection , SqlDataReader 

using Demo04.Librerias.EntidadesNegocio; //beProducto
namespace Demo04.Librerias.AcessoDatos

{
    public class daProducto
    {
        public List <beProducto>  Listar(SqlConnection con) 
        
        {
            List<beProducto> lbeProducto = null;
       
                
                  SqlCommand cmd = new SqlCommand("uspProductsListar", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                  SqlDataReader drd =cmd.ExecuteReader(CommandBehavior.SingleResult);
                if (drd != null) 
                {
                        lbeProducto = new List<beProducto>();
                        beProducto obeProducto;
                        while (drd.Read())
                        {
                            obeProducto = new beProducto();
                            obeProducto.Codigo = drd.GetInt32(0);
                            obeProducto.Nombre = drd.GetString(1);
                            obeProducto.Precio = drd.GetDecimal(2);
                            obeProducto.Stock = Convert.ToInt16(drd.GetValue(3));
                            lbeProducto.Add(obeProducto);

                        }
                        drd.Close();
                    
                

                    
                
        }
        return lbeProducto;
        }
    }
}
