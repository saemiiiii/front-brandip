<%@ page import="kcb.org.json.*" %>
<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%
    //**************************************************************************
	// ���ϸ� : phone_popup3.jsp
	// - �˾�������
	// �޴��� ����Ȯ�� ���� ��� ȭ��(return url).
	// ��ȣȭ�� ������������� ��ȣȭ�Ѵ�.
	//**************************************************************************
	
	//' ó����� ��� ��ū ����
	String MDL_TKN = request.getParameter("mdl_tkn");

	//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //' KCB�κ��� �ο����� ȸ�����ڵ�(���̵�) ���� (12�ڸ�) 
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	//String CP_CD = "V06880000000";	// ȸ�����ڵ�
	String CP_CD = (String)session.getAttribute("PHONE_CP_CD");
	
	//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //' Ÿ�� : �/�׽�Ʈ ��ȯ�� ���� �ʿ�
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	String target = "PROD";	// �׽�Ʈ="TEST", �="PROD"
	
	//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //' ���̼��� ����
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	String license = "C:\\okcert3_license\\" + CP_CD + "_IDS_01_" + target + "_AES_license.dat";
	
	//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //' ���񽺸� (������)
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	String svcName = "IDS_HS_POPUP_RESULT";
	
	/**************************************************************************
	okcert3 ��û ����
	**************************************************************************/
	JSONObject reqJson = new JSONObject();
	
	reqJson.put("MDL_TKN", MDL_TKN);
	String reqStr = reqJson.toString();
	
	/**************************************************************************
	okcert3 ����
	**************************************************************************/
	kcb.module.v3.OkCert okcert = new kcb.module.v3.OkCert();
	
	// '************ IBM JDK ��� ��, �ּ� �����Ͽ� ȣ�� ************
	// okcert.setProtocol2type("22");
	// '��ü �� license�� ���ε��ؾ� �� ��쿡�� �ּ� �����Ͽ� ȣ��. (v1.1.7 ���� ���̼����� ������ġ�� key�� �Ͽ� static HashMap���� ����)
	// okcert.delLicense(license);
	
	//' callOkCert �޼ҵ�ȣ�� : String license ���� path�� ���̼��� �ε�
	String resultStr = okcert.callOkCert(target, CP_CD, svcName, license,  reqStr);
	/*
	// 'OkCert3 ���ο��� String license ���� path�� ���̼����� �� �о�� ���(Executable Jar ȯ�� ��� �߻�),
	// '�޼ҵ� ������ �Ķ���Ϳ� InputStream�� ����Ͽ� ���̼��� �ε�
	String resultStr = null;
	if ( ! okcert.containsLicense(license) ) {			// �ε�� ���̼��� ������ HashMap�� ���� ���
		java.io.InputStream is = new java.io.FileInputStream(license);	// ȯ�濡 �°� InputStream �ε�
		resultStr = okcert.callOkCert(target, CP_CD, svcName, license,  reqStr, is);
	} else {											// �ε�� ���̼��� ������ HashMap�� �ִ� ���
		resultStr = okcert.callOkCert(target, CP_CD, svcName, license,  reqStr);
	}
	*/
	
	JSONObject resJson = new JSONObject(resultStr);
	
    String RSLT_CD =  resJson.getString("RSLT_CD");
    String RSLT_MSG =  resJson.getString("RSLT_MSG");
	String TX_SEQ_NO =  resJson.getString("TX_SEQ_NO");
	
	String RSLT_NAME = "";
	String RSLT_BIRTHDAY = "";
	String RSLT_SEX_CD = "";
	String RSLT_NTV_FRNR_CD = "";
	
	String DI = "";
	String CI = "";
	String CI_UPDATE = "";
	String TEL_COM_CD = "";
	String TEL_NO = "";
	
	String RETURN_MSG= "";
	if(resJson.has("RETURN_MSG")) RETURN_MSG =  resJson.getString("RETURN_MSG");
	
	if ("B000".equals(RSLT_CD)){
		RSLT_NAME = resJson.getString("RSLT_NAME");
		RSLT_BIRTHDAY = resJson.getString("RSLT_BIRTHDAY");
		RSLT_SEX_CD = resJson.getString("RSLT_SEX_CD");
		RSLT_NTV_FRNR_CD = resJson.getString("RSLT_NTV_FRNR_CD");
		
		DI = resJson.getString("DI");
		CI = resJson.getString("CI");
		CI_UPDATE = resJson.getString("CI_UPDATE");
		TEL_COM_CD = resJson.getString("TEL_COM_CD");
		TEL_NO = resJson.getString("TEL_NO");
	}
%>

<title>KCB �޴��� ����Ȯ�� ���� ���� 3</title>
<script type="text/javascript" >
	function fncOpenerSubmit() {
		opener.document.kcbResultForm.CP_CD.value = "<%=CP_CD%>";
		opener.document.kcbResultForm.TX_SEQ_NO.value = "<%=TX_SEQ_NO%>";
		opener.document.kcbResultForm.RSLT_CD.value = "<%=RSLT_CD%>";
		opener.document.kcbResultForm.RSLT_MSG.value = "<%=RSLT_MSG%>";
		
		//'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		//' ����. ���������� �ش��ϴ� ������.
		//' ���ʿ��ϰ� ������� �ʵ��� ���� �ʿ�. (resultData �κ� �������� �߰� �ʿ���)
	    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
		opener.document.kcbResultForm.RSLT_NAME.value = "<%=RSLT_NAME%>";
		opener.document.kcbResultForm.RSLT_BIRTHDAY.value = "<%=RSLT_BIRTHDAY%>";
		opener.document.kcbResultForm.RSLT_SEX_CD.value = "<%=RSLT_SEX_CD%>";
		opener.document.kcbResultForm.RSLT_NTV_FRNR_CD.value = "<%=RSLT_NTV_FRNR_CD%>";
		
		opener.document.kcbResultForm.DI.value = "<%=DI%>";
		opener.document.kcbResultForm.CI.value = "<%=CI%>";
		opener.document.kcbResultForm.CI_UPDATE.value = "<%=CI_UPDATE%>";
		opener.document.kcbResultForm.TEL_COM_CD.value = "<%=TEL_COM_CD%>";
		opener.document.kcbResultForm.TEL_NO.value = "<%=TEL_NO%>";
		
		opener.document.kcbResultForm.RETURN_MSG.value = "<%=RETURN_MSG%>";

		opener.document.kcbResultForm.action = "phone_popup4.jsp";
		opener.document.kcbResultForm.submit();
		
		self.close();
	}	
</script>
</head>
<body>
</body>
<%
	//������� ��ȣȭ ����
	// ��������� Ȯ���Ͽ� �������б���� ó���� �����ؾ��Ѵ�.
	if ("B000".equals(RSLT_CD)) {
		out.println("<script>alert('������������'); fncOpenerSubmit();</script>");
	}
	else {
		out.println("<script>alert('������������ : " + RSLT_CD + " : " + RSLT_MSG + "'); fncOpenerSubmit();</script>");
	}
%>
</html>
