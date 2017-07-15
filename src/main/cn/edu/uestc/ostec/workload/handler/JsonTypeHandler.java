
package cn.edu.uestc.ostec.workload.handler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

public class JsonTypeHandler extends BaseTypeHandler {

	public Object getNullableResult(ResultSet arg0, String arg1)
			throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	public Object getNullableResult(ResultSet arg0, int arg1)
			throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	public Object getNullableResult(CallableStatement arg0, int arg1)
			throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	public void setNonNullParameter(PreparedStatement arg0, int arg1,
			Object arg2, JdbcType arg3) throws SQLException {
		// TODO Auto-generated method stub

	}
}
